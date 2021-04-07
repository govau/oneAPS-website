using FluentValidation;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityModelValidator : AbstractValidator<OpportunityModel> {
        public OpportunityModelValidator() {
            RuleFor(u => u.JobTitle).NotEmpty();

            // RuleFor(u => u.AboutTeam).NotEmpty().When(o => o.);
        }
    }
}