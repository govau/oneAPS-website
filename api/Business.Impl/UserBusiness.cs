using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;
using System;
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

        public UserBusiness(IOptions<AppSettings> appSettings, IEncryptionUtil encryptionUtil, IUserService userService, IMapper mapper) {
            _appSettings = appSettings;
            _userService = userService;
            _mapper = mapper;
            _encryptionUtil = encryptionUtil;
        }

        public async Task<UserSessionResponse> AuthenticateAsync(AuthenticateUserRequest model) {
            string encryptedPassword = _encryptionUtil.Encrypt(model.Password);

            var user = await _userService.AuthenticateAsync(model.EmailAddress, encryptedPassword);
            if (user == null) {
                throw new CannotAuthenticateException();
            }
            // var result = _mapper.Map<UserModel>(user);
            return new UserSessionResponse() {
                Token = GenerateJSONWebToken(user),
                RefreshToken = Guid.NewGuid().ToString().Replace("-", ""),
                UserId = user.Id,
                Name = user.Name,
                Role = user.Role
            };
        }

        public async Task<UserResponse> RegisterAsync(UserCreateRequest model) {
            var exists = await _userService.GetByEmailAsync(model.EmailAddress);
            if (exists != null) {
                // TODO: send email to existing user
                return null;
            }

            var toSave = _mapper.Map<User>(model);
            toSave.Password = _encryptionUtil.Encrypt(model.Password);
            toSave.Active = true;
            toSave.Role = "user";
            var user = await _userService.RegisterAsync(toSave);
            var result = _mapper.Map<UserResponse>(user);
            return result;
        }
        public async Task<IEnumerable<UserResponse>> GetAllAsync() => _mapper.Map<IEnumerable<UserResponse>>(await _userService.GetAllAsync());
        public async Task<UserResponse> GetByIdAsync(int id) => _mapper.Map<UserResponse>(await _userService.GetByIdAsync(id));
        public async Task<UserResponse> GetByEmailAsync(string email) => _mapper.Map<UserResponse>(await _userService.GetByEmailAsync(email));
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
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
