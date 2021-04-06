using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dta.OneAps.Api.Services.Entities
{
    [Table("brief_assessment")]
    public partial class BriefAssessment
    {
        [Key]
        [Column("brief_id")]
        public int BriefId { get; set; }
        [Key]
        [Column("assessment_id")]
        public int AssessmentId { get; set; }
        [ForeignKey(nameof(BriefId))]
        [InverseProperty("BriefAssessment")]
        public virtual Brief Brief { get; set; }
    }
}
