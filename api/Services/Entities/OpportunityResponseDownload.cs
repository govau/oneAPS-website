using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_response_download")]
    public partial class OpportunityResponseDownload
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("opportunity_id")]
        public int OpportunityId { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunityResponseDownload")]
        public virtual Opportunity Opportunity { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("OpportunityResponseDownload")]
        public virtual User User { get; set; }
    }
}
