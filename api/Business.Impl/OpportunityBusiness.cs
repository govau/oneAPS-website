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

        public async Task<OpportunityPublicResponse> Get(int id) {
            var opportunity = await _opportunityService.GetByIdAsync(id);
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityPublicResponse>(opportunity);
            result.Agency = GetAgencyText(agencies, result.Agency);
            return result;
        }
        public async Task<IEnumerable<OpportunityPublicResponse>> List(string search) {
            var list = await _opportunityService.GetAllAsync(search);
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
            return _mapper.Map<IEnumerable<OpportunityAdminResponse>>(await _opportunityService.GetAllAsync(string.Empty));
        }
        public async Task<OpportunityAuthResponse> Create(OpportunitySaveRequest model, IUser user) {
            var toSave = _mapper.Map<Opportunity>(model);
            toSave.OpportunityUser.Add(new OpportunityUser {
                UserId = user.Id
            });
            toSave.Agency = user.Agency;
            var saved = await _opportunityService.Create(toSave, user);
            var result = _mapper.Map<OpportunityAuthResponse>(saved);
            return result;
        }

        public async Task<OpportunityAuthResponse> Update(OpportunitySaveRequest model, IUser user) {
            var existing = await _opportunityService.GetByIdAsync(model.Id);
            var toSave = _mapper.Map(model, existing);
            if (existing.OpportunityUser.Any(ou => ou.UserId == user.Id)) {
                var saved = await _opportunityService.Update(toSave, user);
                var result = _mapper.Map<OpportunityAuthResponse>(saved);
                return result;
            } else {
                throw new UnauthorisedException();
            }
            
        }
        public async Task<OpportunityAuthResponse> Get(int id, IUser user) {
            var opportunity = await _opportunityService.GetByIdAsync(id);
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityAuthResponse>(opportunity);
            result.CanModify = opportunity.OpportunityUser.Any(ou => ou.UserId == user.Id);
            result.NumberOfResponses = opportunity.OpportunityResponse.Count(or => or.SubmittedAt != null);
            result.Agency = GetAgencyText(agencies, result.Agency);
            return result;
        } 
        public async Task<IEnumerable<OpportunityAuthResponse>> List(string search, IUser user) {
            var list = await _opportunityService.GetAllAsync(search);
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityAuthResponse>>(list);
            foreach(var item in result) {
                var opporunity = list.Single(l => l.Id == item.Id);
                item.Agency = GetAgencyText(agencies, item.Agency);
                item.CanModify = opporunity.OpportunityUser.Any(ou => ou.UserId == user.Id);
                item.NumberOfResponses = opporunity.OpportunityResponse.Count(or => or.SubmittedAt != null);
            }
            return result;
        }
        public async Task<IEnumerable<OpportunityAuthResponse>> MyList(IUser user) {
            var list = await _opportunityService.MyList(user);
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityAuthResponse>>(list);
            foreach(var item in result) {
                var opporunity = list.Single(l => l.Id == item.Id);
                item.Agency = GetAgencyText(agencies, item.Agency);
                item.CanModify = true;
                item.NumberOfResponses = opporunity.OpportunityResponse.Count(or => or.SubmittedAt != null);
            }
            return result;
        }

        private string GetAgencyText(IEnumerable<Lookup> agencies, string value) {
            return agencies.SingleOrDefault(a => a.Value == value)?.Text;
        }
    }
}
