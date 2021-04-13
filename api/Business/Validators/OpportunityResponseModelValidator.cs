using FluentValidation;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityResponseModelValidator : AbstractValidator<OpportunityResponseSaveRequest> {
        public OpportunityResponseModelValidator(ILookupBusiness lookupBusiness, IOpportunityBusiness opportunityBusiness, IOpportunityResponseBusiness opportunityResponseBusiness) {
            // RuleFor(u => u.Agency)
            //     .NotEmpty()
            //     .Must(e => lookupBusiness.Get("Agency", e) != null).WithMessage("{PropertyValue} is not a valid {PropertyName}.");
            RuleFor(u => u.OpportunityId)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    return await opportunityBusiness.Get(or) != null;
                }).WithMessage("{PropertyName} does not exist.");
            RuleFor(u => u.WhyPickMe).NotEmpty();
            RuleFor(u => u)
                .MustAsync(async (or, c) => {
                    return await opportunityResponseBusiness.List(or.OpportunityId, or.UserId) == null;
                }).WithMessage("You have already applied for this opportunity.");
        }
    }
}