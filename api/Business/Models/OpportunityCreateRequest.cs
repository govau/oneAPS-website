using System;

namespace Dta.OneAps.Api.Business.Models {
    public class OpportunityCreateRequest {
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public string WhatYoullGain { get; set; }
        public string AboutTeam { get; set; }
        public string NumberOfPeople { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CommitmentTime { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersonPhone { get; set; }
        public string ContactPersonEmail { get; set; }
        public string Location { get; set; }
        public string Skills { get; set; }
        public string AdditionalInfo { get; set; }
        public string SecurityClearance { get; set; }
    }
}
