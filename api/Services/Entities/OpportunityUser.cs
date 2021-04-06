using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_user")]
    public partial class OpportunityUser
    {
        [Key]
        [Column("opportunity_id")]
        public int OpportunityId { get; set; }
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunityUser")]
        public virtual Opportunity Opportunity { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("OpportunityUser")]
        public virtual User User { get; set; }
    }
}
