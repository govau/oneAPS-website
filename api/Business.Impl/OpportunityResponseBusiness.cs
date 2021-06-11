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
using System.Text.RegularExpressions;

namespace Dta.OneAps.Api.Business {
    public class OpportunityResponseBusiness : IOpportunityResponseBusiness {
        private readonly INotifyService _notifyService;
        private readonly IOpportunityService _opportunityService;
        private readonly IOpportunityResponseService _opportunityResponseService;
        private readonly IMapper _mapper;
        private readonly IKeyValueService _keyValueService;
        private readonly IFileService _fileService;
        private readonly ILookupService _lookupService;

        public OpportunityResponseBusiness(ILookupService lookupService, IFileService fileService, INotifyService notifyService, IKeyValueService keyValueService, IOpportunityResponseService opportunityResponseService, IOpportunityService opportunityService, IMapper mapper) {
            _lookupService = lookupService;
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
            var opportunity = await _opportunityService.GetById(model.OpportunityId, false);
            
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
            var regex = new Regex(@"^.+\.(?:(?:[pP][dD][fF]))$");
            if (regex.Match(filename).Success) {
                existing.ResumeUpload = filename;
                var saved = await _opportunityResponseService.Update(existing, user);
                var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);
                await _fileService.SaveFile($"/responses/{existing.Id}/{user.Id}/{filename}", stream);
                return result;
            } else {
                throw new ValidationErrorException();
            }
        }

        public async Task<byte[]> DownloadFile(int id, IUser user) {
            var existing = await _opportunityResponseService.GetById(id);
            if (existing == null) {
                throw new NotFoundException();
            }
            var hasPermission = false;
            if (existing.UserId == user.Id) {
                hasPermission = true;
            }
            if(existing.Opportunity.OpportunityUser.Any(or => or.UserId == user.Id)) {
                hasPermission = true;
            }
            if (hasPermission) {
                return await _fileService.GetFile($"/responses/{existing.Id}/{existing.UserId}/{existing.ResumeUpload}");
            }
            throw new UnauthorizedAccessException();
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

        public async Task<OpportunityResponseSaveResponse> Withdraw(int id, IUser user) {
            var existing = await _opportunityResponseService.GetById(id);
            if (existing.UserId == user.Id) {
                existing.WithdrawnAt = DateTime.UtcNow;
                var saved = await _opportunityResponseService.Update(existing, user);
                var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);
                return result;
            } else {
                throw new UnauthorizedAccessException();
            }
        }

        public async Task<OpportunityResponseSaveResponse> Apply(OpportunityResponseApplyRequest model, IUser user) {
            var existing = await _opportunityResponseService.GetById(model.Id);
            if (existing == null) {
                throw new NotFoundException();
            }
            if (existing.UserId != user.Id) {
                throw new UnauthorizedAccessException();
            }
            if (existing.Opportunity.OpportunityUser.Any(ou => ou.UserId == user.Id)) {
                throw new ValidationErrorException("You cannot apply for your own opportunity");
            }
            var toSave = _mapper.Map(model, existing);
            var saved = await _opportunityResponseService.Update(toSave, user);
            if (!user.EmailVerified) {
                throw new ValidationErrorException("Email verification required. You can verify your email in your profile.");
            }
            toSave.SubmittedAt = DateTime.UtcNow;
            saved = await _opportunityResponseService.Update(toSave, user);
            var result = _mapper.Map<OpportunityResponseSaveResponse>(saved);
            var agency = _lookupService.Get("agency", existing.Opportunity.Agency);
            await _notifyService.SuccessfullyApplied(existing.Opportunity, agency, user);
            foreach (var ou in existing.Opportunity.OpportunityUser) {
                await _notifyService.ApplicationReceived(existing.Opportunity, agency, ou.User);
            }
            
            
            return result;
        }
        public async Task<OpportunityResponsePrivateResponse> Get(int opportunityId, int userId) => (
            _mapper.Map<OpportunityResponsePrivateResponse>(await _opportunityResponseService.Get(opportunityId, userId))
        );
        public async Task<OpportunityResponsePrivateResponse> Get(int id, IUser user) {
            var existing = await _opportunityResponseService.GetById(id);
            if (existing == null) {
                throw new NotFoundException();
            }
            if (existing.UserId != user.Id) {
                throw new UnauthorizedAccessException();
            }
            return _mapper.Map<OpportunityResponsePrivateResponse>(existing);
        } 


        public async Task<IEnumerable<OpportunityResponsePublicResponse>> MyList(IUser user) => (
            _mapper.Map<IEnumerable<OpportunityResponsePublicResponse>>(await _opportunityResponseService.MyList(user))
        );
    }
}
