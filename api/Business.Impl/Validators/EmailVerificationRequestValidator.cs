using System.Linq;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;
using FluentValidation;

namespace Dta.OneAps.Api.Business.Validators {
    public class EmailVerificationRequestValidator : AbstractValidator<EmailVerificationRequest> {
        public EmailVerificationRequestValidator(IUserService userService) {
            RuleFor(u => u.UserId)
                .NotEmpty()
                .MustAsync(async (id, c) => {
                    var user = await userService.GetById(id);
                    return user != null;
                }).WithMessage("Invalid user");
            RuleFor(u => u)
                .NotEmpty()
                .MustAsync(async (ev, c) => {
                    var user = await userService.GetById(ev.UserId);
                    return user.UserClaims.Any(uc => uc.ClaimToken == ev.VerificationCode && uc.IsClaimed == false);
                }).WithMessage("Invalid verification code.");
        }
    }
}