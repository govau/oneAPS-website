using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief")]
    public partial class Brief
    {
        public Brief()
        {
            BriefAssessment = new HashSet<BriefAssessment>();
            BriefAssessor = new HashSet<BriefAssessor>();
            BriefClarificationQuestion = new HashSet<BriefClarificationQuestion>();
            BriefHistory = new HashSet<BriefHistory>();
            BriefResponse = new HashSet<BriefResponse>();
            BriefResponseContact = new HashSet<BriefResponseContact>();
            BriefResponseDownload = new HashSet<BriefResponseDownload>();
            BriefUser = new HashSet<BriefUser>();
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

        [ForeignKey(nameof(DomainId))]
        [InverseProperty("Brief")]
        public virtual ICollection<BriefAssessment> BriefAssessment { get; set; }
        [InverseProperty("Brief")]
        public virtual ICollection<BriefAssessor> BriefAssessor { get; set; }
        [InverseProperty("Brief")]
        public virtual ICollection<BriefClarificationQuestion> BriefClarificationQuestion { get; set; }
        [InverseProperty("Brief")]
        public virtual ICollection<BriefHistory> BriefHistory { get; set; }
        [InverseProperty("Brief")]
        public virtual ICollection<BriefResponse> BriefResponse { get; set; }
        [InverseProperty("Brief")]
        public virtual ICollection<BriefResponseContact> BriefResponseContact { get; set; }
        [InverseProperty("Brief")]
        public virtual ICollection<BriefResponseDownload> BriefResponseDownload { get; set; }
        [InverseProperty("Brief")]
        public virtual ICollection<BriefUser> BriefUser { get; set; }
    }
}
