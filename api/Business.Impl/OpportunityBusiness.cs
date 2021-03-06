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
            var opportunity = await _opportunityService.GetById(id, false);
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityPublicResponse>(opportunity);
            return result;
        }
        public async Task<IEnumerable<OpportunityPublicResponse>> List(string search) {
            var list = await _opportunityService.GetAll(search, false, false);
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityPublicResponse>>(list);
            return result;
        }
        public async Task<IEnumerable<OpportunityAdminResponse>> ListAll(IUser user) {
            if (user.Role != "admin") {
                throw new UnauthorizedAccessException();
            }
            return _mapper.Map<IEnumerable<OpportunityAdminResponse>>(await _opportunityService.GetAll(string.Empty, true, true));
        }
        public async Task<OpportunityAuthResponse> Create(OpportunityCreateRequest request, IUser user) {
            var toSave = _mapper.Map<Opportunity>(request);
            toSave.OpportunityUser.Add(new OpportunityUser {
                UserId = user.Id
            });
            toSave.Agency = user.Agency;
            if (request.IsPosting) {
                toSave.PublishedAt = DateTime.UtcNow;
            }
            var saved = await _opportunityService.Create(toSave, user);
            if (request.IsPosting) {
                if (user.EmailVerified == false) {
                    throw new UnauthorizedAccessException();
                }
                toSave.PublishedAt = DateTime.UtcNow;
                saved = await _opportunityService.Update(toSave, user);
            }
            var result = _mapper.Map<OpportunityAuthResponse>(saved);
            return result;
        }
        public async Task<OpportunityAuthResponse> Update(OpportunityUpdateRequest request, IUser user) {
            var existing = await _opportunityService.GetById(request.Id, true);
            var toSave = _mapper.Map(request, existing);
            if (existing.OpportunityUser.Any(ou => ou.UserId == user.Id)) {
                var saved = await _opportunityService.Update(toSave, user);
                if (request.IsPosting) {
                    if (user.EmailVerified == false) {
                        throw new UnauthorizedAccessException();
                    }
                    toSave.PublishedAt = DateTime.UtcNow;
                    saved = await _opportunityService.Update(toSave, user);
                }
                var result = _mapper.Map<OpportunityAuthResponse>(saved);
                
                return result;
            } else {
                throw new UnauthorizedAccessException();
            }
        }
        public async Task<OpportunityAuthResponse> Close(int id, IUser user) {
            var existing = await _opportunityService.GetById(id, true);
            if (existing.OpportunityUser.Any(ou => ou.UserId == user.Id)) {
                existing.ClosedAt = DateTime.UtcNow;
                var saved = await _opportunityService.Update(existing, user);
                var result = _mapper.Map<OpportunityAuthResponse>(saved);
                return result;
            } else {
                throw new UnauthorizedAccessException();
            }
        }
        public async Task<OpportunityAuthResponse> Get(int id, IUser user) {
            var opportunity = await _opportunityService.GetById(id, true);
            if (opportunity == null) {
                throw new NotFoundException();
            }
            var isOwner = opportunity.OpportunityUser.Any(ou => ou.UserId == user.Id);
            if (!isOwner && !opportunity.PublishedAt.HasValue) {
                throw new NotFoundException();
            }
            var agencies = _lookupService.Get("agency");
            var result = _mapper.Map<OpportunityAuthResponse>(opportunity);
            result.CanModify = isOwner && !opportunity.ClosedAt.HasValue;
            result.NumberOfResponses = opportunity.OpportunityResponse.Count(or => or.SubmittedAt != null && or.WithdrawnAt == null);
            result.ContactPersonEmail = user.EmailVerified ? result.ContactPersonEmail : null;
            result.ContactPersonName = user.EmailVerified ? result.ContactPersonName : null;
            result.ContactPersonPhone = user.EmailVerified ? result.ContactPersonPhone : null;
            return result;
        } 
        public async Task<IEnumerable<OpportunityAuthResponse>> List(string search, IUser user) {
            var list = await _opportunityService.GetAll(search, false, false);
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityAuthResponse>>(list);
            foreach(var item in result) {
                var opportunity = list.Single(l => l.Id == item.Id);
                item.CanModify = opportunity.OpportunityUser.Any(ou => ou.UserId == user.Id) && !opportunity.ClosedAt.HasValue;
                item.NumberOfResponses = opportunity.OpportunityResponse.Count(or => or.SubmittedAt != null && or.WithdrawnAt == null);
                item.ContactPersonEmail = user.EmailVerified ? item.ContactPersonEmail : null;
                item.ContactPersonName = user.EmailVerified ? item.ContactPersonName : null;
                item.ContactPersonPhone = user.EmailVerified ? item.ContactPersonPhone : null;
            }
            return result;
        }
        public async Task<IEnumerable<OpportunityAuthResponse>> MyList(IUser user) {
            var list = await _opportunityService.MyList(user);
            var agencies = _lookupService.Get("agency");

            var result = _mapper.Map<IEnumerable<OpportunityAuthResponse>>(list);
            foreach(var item in result) {
                var opportunity = list.Single(l => l.Id == item.Id);
                item.CanModify = !opportunity.ClosedAt.HasValue;
                item.NumberOfResponses = opportunity.OpportunityResponse.Count(or => or.SubmittedAt != null && or.WithdrawnAt == null);
            }
            return result;
        }
        public async Task<IEnumerable<OpportunityResponsePrivateResponse>> ListResponses(int opportunityId, IUser user) {
            var opportunity = await _opportunityService.GetById(opportunityId, false);
            if (opportunity == null) {
                throw new NotFoundException();
            }
            if (!opportunity.OpportunityUser.Any(ou => ou.UserId == user.Id)) {
                throw new UnauthorizedAccessException();
            }
            return _mapper.Map<IEnumerable<OpportunityResponsePrivateResponse>>(
                opportunity
                    .OpportunityResponse
                    .Where(or => or.SubmittedAt != null && !or.WithdrawnAt.HasValue)
            );
        }
    }
}
