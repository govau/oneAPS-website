using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Services;
using Microsoft.AspNetCore.Authorization;    
using Microsoft.AspNetCore.Mvc;    
using Microsoft.Extensions.Configuration;    
using Microsoft.IdentityModel.Tokens;  
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;    
using System.Security.Claims;    
using System.Text;

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
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));    
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);    
    
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],    
                _config["Jwt:Issuer"],    
                null,    
                expires: DateTime.Now.AddHours(8),    
                signingCredentials: credentials
            );
    
            return new JwtSecurityTokenHandler().WriteToken(token);    
        } 
    }
}
