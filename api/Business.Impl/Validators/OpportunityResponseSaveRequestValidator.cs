using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityResponseSaveRequestValidator : AbstractValidator<OpportunityResponseSaveRequest> {
        public OpportunityResponseSaveRequestValidator(IOpportunityService opportunityService) {
            RuleFor(u => u.OpportunityId)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    return await opportunityService.GetById(or, false) != null;
                }).WithMessage("{PropertyName} does not exist.");
        }
    }
}