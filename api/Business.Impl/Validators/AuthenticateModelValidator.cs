using FluentValidation;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business.Validators {
    public class AuthenticateModelValidator : AbstractValidator<AuthenticateUserRequest> {
        public AuthenticateModelValidator() {
            RuleFor(u => u.EmailAddress).NotEmpty().Matches(".+@.+(\\.edu\\.au|\\.gov\\.au)").WithMessage("'Email Address' must be a gov.au email.");
            RuleFor(u => u.Password).NotEmpty();
        }
    }
}