using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_response")]
    public partial class BriefResponse
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("data", TypeName = "json")]
        public string Data { get; set; }
        [Column("brief_id")]
        public int BriefId { get; set; }
        [Column("supplier_code")]
        public long SupplierCode { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("withdrawn_at")]
        public DateTime? WithdrawnAt { get; set; }
        [Column("submitted_at")]
        public DateTime? SubmittedAt { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefResponse")]
        public virtual Brief Brief { get; set; }
    }
}
