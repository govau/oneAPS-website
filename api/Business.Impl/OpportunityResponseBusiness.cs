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
using System.IO;

namespace Dta.OneAps.Api.Business {
    public class OpportunityResponseBusiness : IOpportunityResponseBusiness {
        private readonly INotifyService _notifyService;
        private readonly IOpportunityService _opportunityService;
        private readonly IOpportunityResponseService _opportunityResponseService;
        private readonly IMapper _mapper;
        private readonly IKeyValueService _keyValueService;
        private readonly IFileService _fileService;

        public OpportunityResponseBusiness(IFileService fileService, INotifyService notifyService, IKeyValueService keyValueService, IOpportunityResponseService opportunityResponseService, IOpportunityService opportunityService, IMapper mapper) {
            _fileService = fileService;
            _notifyService = notifyService;
            _keyValueService = keyValueService;
            _opportunityResponseService = opportunityResponseService;
            _opportunityService = opportunityService;
            _mapper = mapper;
        }

        public async Task<OpportunityResponseSaveResponse> Create(OpportunityResponseSaveRequest model, IUser user) {
            var existing = await _opportunityResponseService.Get(model.OpportunityId, user.Id);
            if (existing == null) {
                var toSave = _mapper.Map<OpportunityResponse>(model);
                var saved = await _opportunityResponseService.Create(toSave, user);
                existing = await _opportunityResponseService.Get(saved.OpportunityId, user.Id);
            } else {
                if (existing.UserId != user.Id) {
                    throw new UnauthorizedAccessException();
                }
            }

            var result = _mapper.Map<OpportunityResponseSaveResponse>(existing);
            return result;
        }

        public async Task<OpportunityResponseSaveResponse> Update(OpportunityResponseSaveRequest model, IUser user) {
            var existing = await _opportunityResponseService.GetById(model.Id);
            if (existing == null) {
                throw new NotFoundException();
            }
            if (existing.UserId != user.Id) {
                throw new UnauthorizedAccessException();
            }
            var opportunity = await _opportunityService.GetByIdAsync(model.OpportunityId);
            if (opportunity.EndDate > DateTime.UtcNow) {
                throw new ResponseTooLateException();
            }
            
            var toSave = _mapper.Map(model, existing);
            var saved = await _opportunityResponseService.Update(toSave, user);
            var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);
            return result;
        }

        public async Task<OpportunityResponseSaveResponse> UploadFile(int id, string filename, Stream stream, IUser user) {
            var existing = await _opportunityResponseService.GetById(id);
            if (existing == null) {
                throw new NotFoundException();
            }
            if (existing.UserId != user.Id) {
                throw new UnauthorizedAccessException();
            }
            existing.ResumeUpload = filename;
            var saved = await _opportunityResponseService.Update(existing, user);
            var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);
            await _fileService.SaveFile($"/responses/{existing.Id}/{user.Id}/{filename}", stream);
            return result;
        }

        public async Task<byte[]> DownloadFile(int id, IUser user) {
            var existing = await _opportunityResponseService.GetById(id);
            if (existing == null) {
                throw new NotFoundException();
            }
            if (existing.UserId != user.Id && !existing.Opportunity.OpportunityUser.Any(or => or.UserId == user.Id)) {
                throw new UnauthorizedAccessException();
            }
            return await _fileService.GetFile($"/responses/{existing.Id}/{user.Id}/{existing.ResumeUpload}");
        }

        public async Task<OpportunityResponseSaveResponse> DeleteFile(int id, string filename, IUser user) {
            var existing = await _opportunityResponseService.GetById(id);
            if (existing == null) {
                throw new NotFoundException();
            }
            if (existing.UserId != user.Id) {
                throw new UnauthorizedAccessException();
            }
            existing.ResumeUpload = null;
            var saved = await _opportunityResponseService.Update(existing, user);
            var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);
            await _fileService.DeleteFile($"/responses/{existing.Id}/{user.Id}/{filename}");
            return result;
        }

        public async Task<OpportunityResponseSaveResponse> Apply(OpportunityResponseApplyRequest model, IUser user) {
            var existing = await _opportunityResponseService.GetById(model.Id);
            if (existing == null) {
                throw new NotFoundException();
            }
            if (existing.UserId != user.Id) {
                throw new UnauthorizedAccessException();
            }
            var toSave = _mapper.Map(model, existing);
            toSave.SubmittedAt = DateTime.UtcNow;
            var saved = await _opportunityResponseService.Update(toSave, user);
            var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);

            await _notifyService.SuccessfullyApplied(existing.Opportunity, user);
            
            return result;
        }
        public async Task<OpportunityResponsePrivateResponse> Get(int opportunityId, int userId) => (
            _mapper.Map<OpportunityResponsePrivateResponse>(await _opportunityResponseService.Get(opportunityId, userId))
        );
        public async Task<OpportunityResponsePrivateResponse> Get(int id) => _mapper.Map<OpportunityResponsePrivateResponse>(await _opportunityResponseService.GetById(id));


        public async Task<IEnumerable<OpportunityResponsePublicResponse>> MyList(IUser user) => (
            _mapper.Map<IEnumerable<OpportunityResponsePublicResponse>>(await _opportunityResponseService.MyList(user))
        );
    }
}
