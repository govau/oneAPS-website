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
    public class UserClaimBusiness : IUserClaimBusiness {
        private readonly IUserService _userService;
        private readonly IUserClaimService _userClaimService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly INotifyService _notifyService;

        public UserClaimBusiness(IOptions<AppSettings> appSettings, INotifyService notifyService, IUserService userService, IUserClaimService userClaimService, IMapper mapper) {
            _appSettings = appSettings;
            _userClaimService = userClaimService;
            _userService = userService;
            _mapper = mapper;
            _notifyService = notifyService;
        }
        public async Task ClaimToken(string token) {
            var userClaim = await _userClaimService.GetByToken(token);
            if (userClaim.IsClaimed) {
                throw new TokenClaimedException();
            }
            await _userClaimService.SetClaimed(token);
            userClaim.User.Active = true;
            await _userService.Update(userClaim.User);
        }
    }
}
