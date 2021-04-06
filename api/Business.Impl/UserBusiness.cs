using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Dta.OneAps.Api.Business {
    public class UserBusiness : IUserBusiness {
        private readonly IEncryptionUtil _encryptionUtil;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private IConfiguration _config;

        public UserBusiness(IConfiguration config, IEncryptionUtil encryptionUtil, IUserService userService, IMapper mapper) {
            _config = config;
            _userService = userService;
            _mapper = mapper;
            _encryptionUtil = encryptionUtil;
        }

        public async Task<string> AuthenticateAsync(AuthenticateModel model) {
            string encryptedPassword = _encryptionUtil.Encrypt(model.Password);

            var user = await _userService.AuthenticateAsync(model.EmailAddress, encryptedPassword);
            if (user == null) {
                throw new CannotAuthenticateException();
            }
            // var result = _mapper.Map<UserModel>(user);
            return GenerateJSONWebToken(user);
        }

        public async Task<UserModel> RegisterAsync(CreateUserModel model) {
            var toSave = _mapper.Map<User>(model);
            toSave.Password = _encryptionUtil.Encrypt(model.Password);
            toSave.Active = true;
            toSave.Role = "user";
            var user = await _userService.RegisterAsync(toSave);

            if (user == null) {
                throw new CannotAuthenticateException();
            }
            var result = _mapper.Map<UserModel>(user);
            return result;
        }
        public async Task<IEnumerable<UserModel>> GetAllAsync() => _mapper.Map<IEnumerable<UserModel>>(await _userService.GetAllAsync());
        public async Task<UserModel> GetByIdAsync(int id) => _mapper.Map<UserModel>(await _userService.GetByIdAsync(id));
        private string GenerateJSONWebToken(User user) {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.EmailAddress),
                    new Claim("Name", user.Name),
                    new Claim("Role", user.Role),
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
