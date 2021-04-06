using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_clarification_question")]
    public partial class BriefClarificationQuestion
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("brief_id")]
        public int BriefId { get; set; }
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

        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefClarificationQuestion")]
        public virtual Brief Brief { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("BriefClarificationQuestion")]
        public virtual User User { get; set; }
    }
}
