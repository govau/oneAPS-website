using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_response")]
    public partial class OpportunityResponse
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("data", TypeName = "json")]
        public string Data { get; set; }
        [Column("opportunity_id")]
        public int OpportunityId { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }
        
        [Column("agency")]
        public string Agency { get; set; }

        [Column("phone_number")]
        public string PhoneNumber { get; set; }

        [Column("why_pick_me")]
        public string WhyPickMe { get; set; }

        [Column("resume_link")]
        public string ResumeLink { get; set; }

        [Column("resume_upload")]
        public string ResumeUpload { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("withdrawn_at")]
        public DateTime? WithdrawnAt { get; set; }
        [Column("submitted_at")]
        public DateTime? SubmittedAt { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunityResponse")]
        public virtual Opportunity Opportunity { get; set; }

        [ForeignKey(nameof(UserId))]
        [InverseProperty("OpportunityResponses")]
        public virtual User User { get; set; }
    }
}
