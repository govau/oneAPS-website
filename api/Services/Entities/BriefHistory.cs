using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_history")]
    public partial class BriefHistory
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("brief_id")]
        public int BriefId { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("edited_at")]
        public DateTime EditedAt { get; set; }
        [Required]
        [Column("data", TypeName = "json")]
        public string Data { get; set; }

        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefHistory")]
        public virtual Brief Brief { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("BriefHistory")]
        public virtual User User { get; set; }
    }
}
