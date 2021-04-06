using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_response_contact")]
    public partial class BriefResponseContact
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("brief_id")]
        public int BriefId { get; set; }
        [Column("supplier_code")]
        public long SupplierCode { get; set; }
        [Required]
        [Column("email_address", TypeName = "character varying")]
        public string EmailAddress { get; set; }

        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefResponseContact")]
        public virtual Brief Brief { get; set; }
    }
}
