using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;
using System.Linq;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityResponseApplyRequestValidator : AbstractValidator<OpportunityResponseApplyRequest> {
        public OpportunityResponseApplyRequestValidator(ILookupService lookupService, IOpportunityService opportunityService, IOpportunityResponseService opportunityResponseService) {
            RuleFor(_ => _.OpportunityId)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    return await opportunityService.GetById(or, false) != null;
                }).WithMessage("{PropertyName} does not exist.")
                .MustAsync(async (or, c) => {
                    var existing = await opportunityService.GetById(or, false);
                    return !existing.ClosedAt.HasValue;
                }).WithMessage("Opportunity was closed");
            RuleFor(_ => _.Id).NotEmpty();
            RuleFor(_ => _.UserId).NotEmpty();
            RuleFor(_ => _.WhyPickMe).NotEmpty();
            RuleFor(_ => _.SubmittedAt).Empty();
            RuleFor(_ => _.ResumeUpload).Matches(@"^.+\.(?:(?:[pP][dD][fF]))$");
            RuleFor(_ => _)
                .MustAsync(async (or, c) => {
                    var existing = await opportunityResponseService.Get(or.OpportunityId, or.UserId);
                    return existing != null;
                }).WithMessage("You have already applied for this opportunity.");
                
        }
    }
}