using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("user_claim")]
    public partial class UserClaim
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }


        [Column("claim_token")]
        public string ClaimToken { get; set; }

        [Column("claim_type")]
        public string ClaimType { get; set; }

        [Column("is_claimed")]
        public bool IsClaimed { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(UserId))]
        [InverseProperty("UserClaims")]
        public virtual User User { get; set; }
    }
}
