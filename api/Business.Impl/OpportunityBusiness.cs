using AutoMapper;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Business {
    public class OpportunityBusiness : IOpportunityBusiness {
        private readonly IOpportunityService _opportunityService;
        private readonly ILookupService _lookupService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public OpportunityBusiness(IOpportunityService opportunityService, IUserService userService, ILookupService lookupService, IMapper mapper) {
            _opportunityService = opportunityService;
            _userService = userService;
            _lookupService = lookupService;
            _mapper = mapper;
        }

        public async Task<OpportunityPublicResponse> Create(OpportunitySaveRequest model, UserResponse creatorUser) {
            var toSave = _mapper.Map<Opportunity>(model);
            var user = await _userService.GetByIdAsync(creatorUser.Id);
            var saved = await _opportunityService.Create(toSave, user);
            var result = _mapper.Map<OpportunityPublicResponse>(saved);
            return result;
        }

        public async Task<OpportunityPublicResponse> Update(OpportunitySaveRequest model, UserResponse modiferUser) {
            var existing = await _opportunityService.GetByIdAsync(model.Id);
            var user = await _userService.GetByIdAsync(modiferUser.Id);
            var toSave = _mapper.Map(model, existing);
            var saved = await _opportunityService.Update(toSave, user);
            var result = _mapper.Map<OpportunityPublicResponse>(saved);
            return result;
        }
        public async Task<IEnumerable<OpportunityPublicResponse>> List() {
            var list = await _opportunityService.GetAllAsync();
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityPublicResponse>>(list);
            foreach(var item in result) {
                item.Agency = GetAgencyText(agencies, item.Agency);
            }
            return result;
        }
        public async Task<IEnumerable<OpportunityAdminResponse>> ListAll() => _mapper.Map<IEnumerable<OpportunityAdminResponse>>(await _opportunityService.GetAllAsync());
        public async Task<OpportunityPublicResponse> Get(int id) {
            var opportunity = await _opportunityService.GetByIdAsync(id);
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityPublicResponse>(opportunity);
            result.Agency = GetAgencyText(agencies, result.Agency);
            return result;
        } 

        private string GetAgencyText(IEnumerable<Lookup> agencies, string value) {
            return agencies.SingleOrDefault(a => a.Value == value)?.Text;
        }
    }
}
