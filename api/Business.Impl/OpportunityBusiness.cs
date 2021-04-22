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
            var opportunity = await _opportunityService.GetById(id);
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityPublicResponse>(opportunity);
            return result;
        }
        public async Task<IEnumerable<OpportunityPublicResponse>> List(string search) {
            var list = await _opportunityService.GetAll(search);
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityPublicResponse>>(list);
            return result;
        }
        public async Task<IEnumerable<OpportunityAdminResponse>> ListAll(IUser user) {
            if (user.Role != "admin") {
                throw new UnauthorizedAccessException();
            }
            return _mapper.Map<IEnumerable<OpportunityAdminResponse>>(await _opportunityService.GetAll(string.Empty));
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
            var existing = await _opportunityService.GetById(model.Id);
            var toSave = _mapper.Map(model, existing);
            if (existing.OpportunityUser.Any(ou => ou.UserId == user.Id)) {
                var saved = await _opportunityService.Update(toSave, user);
                var result = _mapper.Map<OpportunityAuthResponse>(saved);
                return result;
            } else {
                throw new UnauthorizedAccessException();
            }
            
        }
        public async Task<OpportunityAuthResponse> Get(int id, IUser user) {
            var opportunity = await _opportunityService.GetById(id);
            if (opportunity == null) {
                throw new NotFoundException();
            }
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityAuthResponse>(opportunity);
            result.CanModify = opportunity.OpportunityUser.Any(ou => ou.UserId == user.Id);
            result.NumberOfResponses = opportunity.OpportunityResponse.Count(or => or.SubmittedAt != null);
            return result;
        } 
        public async Task<IEnumerable<OpportunityAuthResponse>> List(string search, IUser user) {
            var list = await _opportunityService.GetAll(search);
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityAuthResponse>>(list);
            foreach(var item in result) {
                var opporunity = list.Single(l => l.Id == item.Id);
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
                item.CanModify = true;
                item.NumberOfResponses = opporunity.OpportunityResponse.Count(or => or.SubmittedAt != null);
            }
            return result;
        }
        public async Task<IEnumerable<OpportunityResponsePrivateResponse>> ListResponses(int opportunityId, IUser user) {
            var opportunity = await _opportunityService.GetById(opportunityId);
            if (opportunity == null) {
                throw new NotFoundException();
            }
            if (!opportunity.OpportunityResponse.All(or => or.UserId == user.Id)) {
                throw new UnauthorizedAccessException();
            }
            return _mapper.Map<IEnumerable<OpportunityResponsePrivateResponse>>(
                opportunity
                    .OpportunityResponse
                    .Where(or => or.SubmittedAt != null)
            );
        }
    }
}
