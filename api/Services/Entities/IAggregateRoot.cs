using System;
using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Services.Entities {
    public partial interface IAggregateRoot {
        [Required]
        int Id { get; set; }
        DateTime? Modifed { get; set; }
        DateTime Created { get; set; }
        int CreatedBy { get; set; }
        User CreatedByUser { get; set; }
        int? ModifiedBy { get; set; }
        User ModifiedByUser { get; set; }
    }
}
