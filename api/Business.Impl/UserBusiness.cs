using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Services;
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
        private readonly IUserSessionBusiness _userSessionBusiness;
        private readonly IMapper _mapper;
        private IConfiguration _config;   

        public UserBusiness(IConfiguration config, IEncryptionUtil encryptionUtil, IUserService userService, IUserSessionBusiness userSessionBusiness, IMapper mapper) {
            _config = config;
            _userService = userService;
            _userSessionBusiness = userSessionBusiness;
            _mapper = mapper;
            _encryptionUtil = encryptionUtil;
        }

        public async Task<UserModel> AuthenticateAsync(AuthenticateModel model) {
            string encryptedPassword = _encryptionUtil.Encrypt(model.Password);

            var user = await _userService.AuthenticateAsync(model.Username, encryptedPassword);
            if (user == null) {
                throw new CannotAuthenticateException();
            }
            var result = _mapper.Map<UserModel>(user);
            // result.Token = await _userSessionBusiness.CreateSessionAsync(result);
            result.Token = GenerateJSONWebToken(result);
            return result;
        }
        public async Task<IEnumerable<UserModel>> GetAllAsync() => _mapper.Map<IEnumerable<UserModel>>(await _userService.GetAllAsync());
        public async Task<UserModel> GetByIdAsync(int id) => _mapper.Map<UserModel>(await _userService.GetByIdAsync(id));
        private string GenerateJSONWebToken(UserModel userModel) {
            // var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));    
            // var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);    
    
            // var token = new JwtSecurityToken(
            //     _config["Jwt:Issuer"],    
            //     _config["Jwt:Issuer"],    
            //     null,    
            //     expires: DateTime.Now.AddHours(8),    
            //     signingCredentials: credentials
            // );
    
            // return new JwtSecurityTokenHandler().WriteToken(token);    


            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new []
                {
                    new Claim("Id", userModel.Id.ToString()), 
                    new Claim(JwtRegisteredClaimNames.Email, userModel.EmailAddress),
                    new Claim(JwtRegisteredClaimNames.Sub, userModel.EmailAddress),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        } 
    }
}
