using System;
using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Services.Entities {
    public partial interface IAggregateRoot {
        [Required]
        int Id { get; set; }
        DateTime? Modifed { get; set; }
        DateTime Created { get; set; }
        string CreatedBy { get; set; }
        string ModifiedBy { get; set; }
    }
}
