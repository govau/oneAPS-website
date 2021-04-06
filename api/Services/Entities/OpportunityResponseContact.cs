using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_response_contact")]
    public partial class OpportunityResponseContact
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("opportunity_id")]
        public int OpportunityId { get; set; }
        [Column("supplier_code")]
        public long SupplierCode { get; set; }
        [Required]
        [Column("email_address", TypeName = "character varying")]
        public string EmailAddress { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunityResponseContact")]
        public virtual Opportunity Opportunity { get; set; }
    }
}
