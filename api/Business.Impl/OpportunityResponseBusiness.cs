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
    public class OpportunityResponseBusiness : IOpportunityResponseBusiness {
        private readonly IEncryptionUtil _encryptionUtil;
        private readonly IOpportunityResponseService _opportunityResponseService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private IConfiguration _config;

        public OpportunityResponseBusiness(IConfiguration config, IEncryptionUtil encryptionUtil, IOpportunityResponseService opportunityResponseService, IUserService userService, IMapper mapper) {
            _config = config;
            _opportunityResponseService = opportunityResponseService;
            _userService = userService;
            _mapper = mapper;
            _encryptionUtil = encryptionUtil;
        }

        public async Task<OpportunityResponseSaveResponse> Create(OpportunityResponseSaveRequest model, UserResponse userModel) {
            var user = await _userService.GetByIdAsync(userModel.Id);
            var existing = await _opportunityResponseService.Get(model.OpportunityId, user.Id);
            if (existing == null) {
                var toSave = _mapper.Map<OpportunityResponse>(model);
                existing = await _opportunityResponseService.Create(toSave, user);
            }
            var result = _mapper.Map<OpportunityResponseSaveResponse>(existing);
            return result;
        }

        public async Task<OpportunityResponseSaveResponse> Update(OpportunityResponseSaveRequest model, UserResponse modiferUser) {
            var existing = await _opportunityResponseService.GetById(model.Id);
            var user = await _userService.GetByIdAsync(modiferUser.Id);
            var toSave = _mapper.Map(model, existing);
            var saved = await _opportunityResponseService.Update(toSave, user);
            var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);
            return result;
        }
        public async Task<OpportunityResponsePrivateResponse> Get(int opportunityId, int userId) => (
            _mapper.Map<OpportunityResponsePrivateResponse>(await _opportunityResponseService.Get(opportunityId, userId))
        );
        public async Task<IEnumerable<OpportunityResponsePublicResponse>> ListByOpportunityId(int opportunityId) => (
            _mapper.Map<IEnumerable<OpportunityResponsePublicResponse>>(await _opportunityResponseService.ListByOpportunityId(opportunityId))
        );
        public async Task<OpportunityResponsePublicResponse> Get(int id) => _mapper.Map<OpportunityResponsePublicResponse>(await _opportunityResponseService.GetById(id));
    }
}
