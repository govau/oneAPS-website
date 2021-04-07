using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities {
    [Table("opportunity")]
    public partial class Opportunity : IAggregateRoot {
        public Opportunity() {
            OpportunityAssessor = new HashSet<OpportunityAssessor>();
            OpportunityClarificationQuestion = new HashSet<OpportunityClarificationQuestion>();
            OpportunityHistory = new HashSet<OpportunityHistory>();
            OpportunityResponse = new HashSet<OpportunityResponse>();
            OpportunityResponseContact = new HashSet<OpportunityResponseContact>();
            OpportunityResponseDownload = new HashSet<OpportunityResponseDownload>();
            OpportunityUser = new HashSet<OpportunityUser>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("job_title")]
        public string JobTitle { get; set; }

        [Column("job_description")]
        public string JobDescription { get; set; }

        [Column("what_you_gain")]
        public string WhatYoullGain { get; set; }

        [Column("about_team")]
        public string AboutTeam { get; set; }

        [Column("number_of_people")]
        public string NumberOfPeople { get; set; }

        [Column("start_date")]
        public DateTime StartDate { get; set; }

        [Column("end_date")]
        public DateTime EndDate { get; set; }

        [Column("commitment_time")]
        public string CommitmentTime { get; set; }

        [Column("agency")]
        public string Agency { get; set; }

        [Column("contact_person_name")]
        public string ContactPersonName { get; set; }

        [Column("contact_person_phone")]
        public string ContactPersonPhone { get; set; }

        [Column("location")]
        public string Location { get; set; }

        [Column("skills")]
        public string Skills { get; set; }

        [Column("additional_info")]
        public string AdditionalInfo { get; set; }

        [Column("security_clearance ")]
        public string SecurityClearance { get; set; }

        [Column("modifed")]
        public DateTime? Modifed { get; set; }

        [Column("created")]
        public DateTime Created { get; set; }

        [Required]
        [Column("created_by")]
        public string CreatedBy { get; set; }

        [Column("modified_by")]
        public string ModifiedBy { get; set; }


        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunitySkill> OpportunitySkills { get; set; }

        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunityAssessor> OpportunityAssessor { get; set; }
        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunityClarificationQuestion> OpportunityClarificationQuestion { get; set; }
        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunityHistory> OpportunityHistory { get; set; }
        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunityResponse> OpportunityResponse { get; set; }
        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunityResponseContact> OpportunityResponseContact { get; set; }
        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunityResponseDownload> OpportunityResponseDownload { get; set; }
        [InverseProperty("Opportunity")]
        public virtual ICollection<OpportunityUser> OpportunityUser { get; set; }
    }
}
