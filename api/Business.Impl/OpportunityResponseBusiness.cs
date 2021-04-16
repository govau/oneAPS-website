using AutoMapper;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Business {
    public class OpportunityResponseBusiness : IOpportunityResponseBusiness {
        private readonly INotifyService _notifyService;
        private readonly IOpportunityResponseService _opportunityResponseService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private IKeyValueService _keyValueService;

        public OpportunityResponseBusiness(INotifyService notifyService, IKeyValueService keyValueService, IOpportunityResponseService opportunityResponseService, IUserService userService, IMapper mapper) {
            _notifyService = notifyService;
            _keyValueService = keyValueService;
            _opportunityResponseService = opportunityResponseService;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<OpportunityResponseSaveResponse> Create(OpportunityResponseSaveRequest model, UserResponse userModel) {
            var user = await _userService.GetByIdAsync(userModel.Id);
            var existing = await _opportunityResponseService.Get(model.OpportunityId, user.Id);
            if (existing == null) {
                var toSave = _mapper.Map<OpportunityResponse>(model);
                var saved = await _opportunityResponseService.Create(toSave, user);
                existing = await _opportunityResponseService.Get(saved.OpportunityId, user.Id);
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

        public async Task<OpportunityResponseSaveResponse> Apply(OpportunityResponseApplyRequest model, UserResponse userResponse) {
            var existing = await _opportunityResponseService.GetById(model.Id);
            var user = await _userService.GetByIdAsync(userResponse.Id);
            existing.SubmittedAt = DateTime.UtcNow;
            var saved = await _opportunityResponseService.Update(existing, user);

            var notifyConfig = await _keyValueService.GetByKey("notify");
            var personalisation = new Dictionary<string, dynamic>(){
                {"opportunityName", existing.Opportunity.JobTitle},
                {"name", user.Name}
            };
            string templateId = notifyConfig.templateIdAppliedForOpportunity;
            _notifyService.SendEmail(
                user.EmailAddress,
                templateId,
                personalisation
            );
            
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
