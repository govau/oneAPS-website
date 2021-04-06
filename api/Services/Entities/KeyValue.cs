using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("key_value")]
    public partial class KeyValue
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
        [Column("key", TypeName = "character varying")]
        public string Key { get; set; }
        [Column("data", TypeName = "json")]
        public string Data { get; set; }
    }
}
