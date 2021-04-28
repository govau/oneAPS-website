using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using System;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityCreateRequestValidator : AbstractValidator<OpportunityCreateRequest> {
        public OpportunityCreateRequestValidator() {
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
        }
    }
}