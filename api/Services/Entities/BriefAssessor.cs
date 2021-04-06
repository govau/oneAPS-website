using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_assessor")]
    public partial class BriefAssessor
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("brief_id")]
        public int BriefId { get; set; }
        [Column("user_id")]
        public int? UserId { get; set; }
        [Column("email_address", TypeName = "character varying")]
        public string EmailAddress { get; set; }

        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefAssessor")]
        public virtual Brief Brief { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("BriefAssessor")]
        public virtual User User { get; set; }
    }
}
