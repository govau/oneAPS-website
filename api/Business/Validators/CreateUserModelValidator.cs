using FluentValidation;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business.Validators {
    public class CreateUserModelValidator : AbstractValidator<CreateUserModel> {
        public CreateUserModelValidator() {
            RuleFor(u => u.Name).NotEmpty();
            RuleFor(u => u.EmailAddress).NotEmpty().Matches(".+@.+\\.gov\\.au").WithMessage("'Email Address' must be a gov.au email");
            RuleFor(u => u.Agency).NotEmpty();
            RuleFor(u => u.Password).NotEmpty().MinimumLength(8);
        }
    }
}