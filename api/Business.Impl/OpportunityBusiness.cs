using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Business {
    public class OpportunityBusiness : IOpportunityBusiness {
        private readonly IOpportunityService _opportunityService;
        private readonly ILookupService _lookupService;
        private readonly IMapper _mapper;

        public OpportunityBusiness(IOpportunityService opportunityService, ILookupService lookupService, IMapper mapper) {
            _opportunityService = opportunityService;
            _lookupService = lookupService;
            _mapper = mapper;
        }

        public async Task<OpportunityPublicResponse> Create(OpportunitySaveRequest model, IUser user) {
            var toSave = _mapper.Map<Opportunity>(model);
            toSave.OpportunityUser.Add(new OpportunityUser {
                UserId = user.Id
            });
            toSave.Agency = user.Agency;
            var saved = await _opportunityService.Create(toSave, user);
            var result = _mapper.Map<OpportunityPublicResponse>(saved);
            return result;
        }

        public async Task<OpportunityPublicResponse> Update(OpportunitySaveRequest model, IUser user) {
            var existing = await _opportunityService.GetByIdAsync(model.Id);
            var toSave = _mapper.Map(model, existing);
            if (existing.OpportunityUser.Any(ou => ou.UserId == user.Id)) {
                var saved = await _opportunityService.Update(toSave, user);
                var result = _mapper.Map<OpportunityPublicResponse>(saved);
                return result;
            } else {
                throw new UnauthorisedException();
            }
            
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
        public async Task<IEnumerable<OpportunityAdminResponse>> ListAll(IUser user) {
            if (user.Role != "admin") {
                throw new UnauthorisedException();
            }
            return _mapper.Map<IEnumerable<OpportunityAdminResponse>>(await _opportunityService.GetAllAsync());
        }
        public async Task<OpportunityPublicResponse> Get(int id) {
            var opportunity = await _opportunityService.GetByIdAsync(id);
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityPublicResponse>(opportunity);
            result.Agency = GetAgencyText(agencies, result.Agency);
            result.CreatedByUserId = opportunity.CreatedByUser.Id;
            return result;
        } 

        private string GetAgencyText(IEnumerable<Lookup> agencies, string value) {
            return agencies.SingleOrDefault(a => a.Value == value)?.Text;
        }
    }
}
