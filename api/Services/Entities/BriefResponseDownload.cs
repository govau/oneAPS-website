using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_response_download")]
    public partial class BriefResponseDownload
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("brief_id")]
        public int BriefId { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefResponseDownload")]
        public virtual Brief Brief { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("BriefResponseDownload")]
        public virtual User User { get; set; }
    }
}
