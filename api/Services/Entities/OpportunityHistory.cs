using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_history")]
    public partial class OpportunityHistory
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("opportunity_id")]
        public int OpportunityId { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("edited_at")]
        public DateTime EditedAt { get; set; }
        [Required]
        [Column("data", TypeName = "json")]
        public string Data { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunityHistory")]
        public virtual Opportunity Opportunity { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("OpportunityHistory")]
        public virtual User User { get; set; }
    }
}
