using FluentValidation;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Services;
using System;

namespace Dta.OneAps.Api.Business.Validators {
    public class OpportunityUpdateRequestValidator : AbstractValidator<OpportunityUpdateRequest> {
        public OpportunityUpdateRequestValidator(IOpportunityService opportunityService) {
            RuleFor(u => u.Id).NotEmpty();
            RuleFor(u => u.JobTitle).NotEmpty();
            RuleFor(u => u.JobDescription).NotEmpty();
            RuleFor(u => u.WhatYoullGain).NotEmpty();
            RuleFor(u => u.AboutTeam).NotEmpty();
            RuleFor(u => u.NumberOfPeople).NotEmpty();
            RuleFor(u => u.Location).NotEmpty();
            RuleFor(u => u.Skills).NotEmpty();
            RuleFor(u => u.StartDate).NotEmpty();
            RuleFor(u => u.EndDate).NotEmpty().GreaterThan(_ => _.StartDate);
            RuleFor(u => u.ContactPersonName).NotEmpty();
            RuleFor(u => u.ContactPersonPhone).NotEmpty();
            RuleFor(u => u.SecurityClearance).NotEmpty();
            RuleFor(_ => _)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    var existing = await opportunityService.GetById(or.Id, true);
                    if (existing == null) {
                        return true;
                    }
                    return !existing.ClosedAt.HasValue;
                }).WithMessage("Cannot modify a closed opportunity");
            RuleFor(_ => _)
                .NotEmpty()
                .MustAsync(async (or, c) => {
                    var existing = await opportunityService.GetById(or.Id, true);
                    if (existing == null) {
                        return true;
                    }
                    return !existing.ClosedAt.HasValue;
                }).WithMessage("Cannot modify a closed opportunity");
        }
    }
}