using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using System.Collections.Generic;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityResponseSaveRequestValidator : AbstractValidator<OpportunityResponseSaveRequest> {
        public OpportunityResponseSaveRequestValidator(ILookupBusiness lookupBusiness, IOpportunityBusiness opportunityBusiness, IOpportunityResponseBusiness opportunityResponseBusiness) {
            // RuleFor(u => u.Agency)
            //     .NotEmpty()
            //     .Must(e => lookupBusiness.Get("Agency", e) != null).WithMessage("{PropertyValue} is not a valid {PropertyName}.");
            RuleFor(u => u.OpportunityId)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    return await opportunityBusiness.Get(or) != null;
                }).WithMessage("{PropertyName} does not exist.");
        }
    }
}