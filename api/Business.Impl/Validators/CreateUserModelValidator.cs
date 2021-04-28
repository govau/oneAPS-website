using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;

namespace Dta.OneAps.Api.Business.Validators {
    public class CreateUserModelValidator : AbstractValidator<UserCreateRequest> {
        public CreateUserModelValidator(ILookupService lookupService) {
            RuleFor(u => u.Name).NotEmpty();
            RuleFor(u => u.Mobile).NotEmpty().MaximumLength(10);
            RuleFor(u => u.EmailAddress)
                .NotEmpty()
                .Matches(".+@.+\\.gov\\.au").WithMessage("{PropertyValue} must be a gov.au {PropertyName}");
            RuleFor(u => u.Agency)
                .NotEmpty()
                .Must(e => lookupService.Get("Agency", e) != null).WithMessage("{PropertyValue} is not a valid {PropertyName}.");
            RuleFor(u => u.Password).NotEmpty().MinimumLength(8);
        }
    }
}