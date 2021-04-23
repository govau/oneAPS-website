using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using System;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityModelValidator : AbstractValidator<OpportunitySaveRequest> {
        public OpportunityModelValidator(IOpportunityBusiness opportunityBusiness) {
            RuleFor(u => u.JobTitle).NotEmpty();
            RuleFor(u => u.JobDescription).NotEmpty();
            RuleFor(u => u.WhatYoullGain).NotEmpty();
            RuleFor(u => u.AboutTeam).NotEmpty();
            RuleFor(u => u.NumberOfPeople).NotEmpty();
            RuleFor(u => u.Location).NotEmpty();
            RuleFor(u => u.Skills).NotEmpty();
            RuleFor(u => u.StartDate).NotEmpty().GreaterThanOrEqualTo(DateTime.Now.Date);
            RuleFor(u => u.EndDate).NotEmpty().GreaterThan(_ => _.StartDate);
            RuleFor(u => u.ContactPersonName).NotEmpty();
            RuleFor(u => u.ContactPersonPhone).NotEmpty();
            RuleFor(u => u.SecurityClearance).NotEmpty();
            RuleFor(_ => _)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    var existing = await opportunityBusiness.Get(or.Id);
                    if (existing == null) {
                        return true;
                    }
                    return !existing.ClosedAt.HasValue;
                }).WithMessage("Cannot modify a closed opportunity");
        }
    }
}