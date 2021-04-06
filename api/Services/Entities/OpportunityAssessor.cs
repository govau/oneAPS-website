using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_assessor")]
    public partial class OpportunityAssessor
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("opportunity_id")]
        public int OpportunityId { get; set; }
        [Column("user_id")]
        public int? UserId { get; set; }
        [Column("email_address", TypeName = "character varying")]
        public string EmailAddress { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunityAssessor")]
        public virtual Opportunity Opportunity { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("OpportunityAssessor")]
        public virtual User User { get; set; }
    }
}
