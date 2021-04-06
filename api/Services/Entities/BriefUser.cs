using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_user")]
    public partial class BriefUser
    {
        [Key]
        [Column("brief_id")]
        public int BriefId { get; set; }
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefUser")]
        public virtual Brief Brief { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("BriefUser")]
        public virtual User User { get; set; }
    }
}
