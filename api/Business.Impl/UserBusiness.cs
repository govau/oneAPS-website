using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;
using System;
using System.Linq;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Dta.OneAps.Api.Business {
    public class UserBusiness : IUserBusiness {
        private readonly IEncryptionUtil _encryptionUtil;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly INotifyService _notifyService;

        public UserBusiness(IOptions<AppSettings> appSettings, IEncryptionUtil encryptionUtil, INotifyService notifyService, IUserService userService, IMapper mapper) {
            _appSettings = appSettings;
            _userService = userService;
            _mapper = mapper;
            _encryptionUtil = encryptionUtil;
            _notifyService = notifyService;
        }

        public async Task<UserSessionResponse> AuthenticateAsync(AuthenticateUserRequest model) {
            string encryptedPassword = _encryptionUtil.Encrypt(model.Password);
            
            var user = await _userService.Authenticate(model.EmailAddress);
            if (user == null) {
                throw new CannotAuthenticateException();
            }
            UserSessionResponse session = null;
            if (user.FailedLoginCount < 5 && user.Password == encryptedPassword) {
                user.LoggedInAt = DateTime.UtcNow;
                user.FailedLoginCount = 0;
                session = new UserSessionResponse() {
                    Token = GenerateJSONWebToken(user),
                    RefreshToken = Guid.NewGuid().ToString().Replace("-", ""),
                    UserId = user.Id,
                    Name = user.Name,
                    Role = user.Role
                };
            } else {
                user.FailedLoginCount++;
            }
            await _userService.Update(user);
            if (session == null) {
                throw new CannotAuthenticateException();
            }
            return session;
        }

        public async Task<IUser> RegisterAsync(UserCreateRequest model) {
            var exists = await _userService.GetByEmail(model.EmailAddress);
            User user;
            var userClaim = new UserClaim {
                ClaimToken = $"{Guid.NewGuid()}{Guid.NewGuid()}".Replace("-", ""),
                CreatedAt = DateTime.UtcNow
            };
            if (exists != null) {
                if (exists.Active == false) {
                    foreach (var uc in exists.UserClaims) {
                        uc.IsClaimed = true;
                    }
                    userClaim.ClaimType = "UpdateUser".ToLower();
                    exists.UserClaims.Add(userClaim);
                    exists.Password = _encryptionUtil.Encrypt(model.Password);
                    user = await _userService.Update(exists);
                } else {
                    // TODO: send email to existing user
                    return null;
                }
            } else {
                var toSave = _mapper.Map<User>(model);
                toSave.Password = _encryptionUtil.Encrypt(model.Password);
                toSave.Role = "user";
                toSave.CreatedAt = DateTime.UtcNow;
                userClaim.ClaimType = "NewUser".ToLower();
                toSave.UserClaims.Add(userClaim);
                user = await _userService.Create(toSave);
            }
            user = await _userService.GetById(user.Id);
            var result = _mapper.Map<IUser>(user);
            await _notifyService.RegistrationConfirmation(result, user.UserClaims.Last());

            return result;
        }
        public async Task<IEnumerable<IUser>> GetAllAsync() => _mapper.Map<IEnumerable<IUser>>(await _userService.GetAll());
        public async Task<UserResponse> GetByIdAsync(int id) => _mapper.Map<UserResponse>(await _userService.GetById(id));
        public async Task<IUser> GetByEmailAsync(string email) => _mapper.Map<IUser>(await _userService.GetByEmail(email));
        private string GenerateJSONWebToken(User user) {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.Value.JwtKey);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.EmailAddress),
                    new Claim("Name", user.Name),
                    new Claim("Role", user.Role),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _appSettings.Value.JwtIssuer,
                Audience = _appSettings.Value.JwtAudience
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
