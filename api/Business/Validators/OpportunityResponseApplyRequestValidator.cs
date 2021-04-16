using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using System.Collections.Generic;
using System.Linq;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityResponseApplyRequestValidator : AbstractValidator<OpportunityResponseApplyRequest> {
        public OpportunityResponseApplyRequestValidator(ILookupBusiness lookupBusiness, IOpportunityBusiness opportunityBusiness, IOpportunityResponseBusiness opportunityResponseBusiness) {
            RuleFor(_ => _.OpportunityId)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    return await opportunityBusiness.Get(or) != null;
                }).WithMessage("{PropertyName} does not exist.");
            RuleFor(_ => _.Id).NotEmpty();
            RuleFor(_ => _.UserId).NotEmpty();
            RuleFor(_ => _.WhyPickMe).NotEmpty();
            RuleFor(_ => _.SubmittedAt).Empty();
            RuleFor(_ => _)
                .MustAsync(async (or, c) => {
                    var existing = await opportunityResponseBusiness.Get(or.OpportunityId, or.UserId);
                    return existing != null;
                }).WithMessage("You have already applied for this opportunity.");            
            // When(or => or.Id == 0, () => {
            //     RuleFor(u => u)
            //         .MustAsync(async (or, c) => {
            //             var list = new List<OpportunityResponsePublicResponse>(await opportunityResponseBusiness.List(or.OpportunityId, or.UserId));
            //             return list.Count == 0;
            //         }).WithMessage("You have already applied for this opportunity.");
            // });
        }
    }
}