using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_clarification_question")]
    public partial class OpportunityClarificationQuestion
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("opportunity_id")]
        public int OpportunityId { get; set; }
        [Required]
        [Column("question", TypeName = "character varying")]
        public string Question { get; set; }
        [Required]
        [Column("answer", TypeName = "character varying")]
        public string Answer { get; set; }
        [Column("published_at")]
        public DateTime PublishedAt { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunityClarificationQuestion")]
        public virtual Opportunity Opportunity { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("OpportunityClarificationQuestion")]
        public virtual User User { get; set; }
    }
}
