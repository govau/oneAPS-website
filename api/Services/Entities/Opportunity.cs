using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity")]
    public partial class Opportunity
    {
        public Opportunity()
        {
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
        [Column("framework_id")]
        public int FrameworkId { get; set; }
        [Column("lot_id")]
        public int LotId { get; set; }
        [Column("data", TypeName = "json")]
        public string Data { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
        [Column("published_at")]
        public DateTime? PublishedAt { get; set; }
        [Column("withdrawn_at")]
        public DateTime? WithdrawnAt { get; set; }
        [Column("domain_id")]
        public int? DomainId { get; set; }
        [Column("closed_at")]
        public DateTime? ClosedAt { get; set; }
        [Column("questions_closed_at")]
        public DateTime? QuestionsClosedAt { get; set; }
        [Column("responses_zip_filesize")]
        public long? ResponsesZipFilesize { get; set; }

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
