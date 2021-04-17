using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("user")]
    public partial class User
    {
        public User()
        {
            OpportunityAssessor = new HashSet<OpportunityAssessor>();
            OpportunityClarificationQuestion = new HashSet<OpportunityClarificationQuestion>();
            OpportunityHistory = new HashSet<OpportunityHistory>();
            OpportunityResponseDownload = new HashSet<OpportunityResponseDownload>();
            OpportunityUser = new HashSet<OpportunityUser>();
            OpportunityCreatedByUser = new HashSet<Opportunity>();
            OpportunityModifiedByUser = new HashSet<Opportunity>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name", TypeName = "character varying")]
        public string Name { get; set; }
        [Required]
        [Column("email_address", TypeName = "character varying")]
        public string EmailAddress { get; set; }
        [Required]
        [Column("password", TypeName = "character varying")]
        public string Password { get; set; }
        [Column("active")]
        public bool Active { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
        [Column("password_changed_at")]
        public DateTime PasswordChangedAt { get; set; }
        [Column("logged_in_at")]
        public DateTime? LoggedInAt { get; set; }
        [Column("failed_login_count")]
        public int FailedLoginCount { get; set; }
        [Column("agency")]
        public string Agency { get; set; }
        [Column("role")]
        public string Role { get; set; }

        [InverseProperty("User")]
        public virtual ICollection<OpportunityAssessor> OpportunityAssessor { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<OpportunityClarificationQuestion> OpportunityClarificationQuestion { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<OpportunityHistory> OpportunityHistory { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<OpportunityResponseDownload> OpportunityResponseDownload { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<OpportunityUser> OpportunityUser { get; set; }
        [InverseProperty("CreatedByUser")]
        public virtual ICollection<Opportunity> OpportunityCreatedByUser { get; set; }

        [InverseProperty("ModifiedByUser")]
        public virtual ICollection<Opportunity> OpportunityModifiedByUser { get; set; }

        [InverseProperty("User")]
        public virtual ICollection<OpportunityResponse> OpportunityResponses { get; set; }
    }
}
