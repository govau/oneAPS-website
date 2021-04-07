using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("opportunity_skill")]
    public partial class OpportunitySkill
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("opportunity_id")]
        public int OpportunityId { get; set; }

        [Column("skill_key")]
        public int SkillKey { get; set; }

        [ForeignKey(nameof(OpportunityId))]
        [InverseProperty("OpportunitySkills")]
        public virtual Opportunity Opportunity { get; set; }
    }
}
