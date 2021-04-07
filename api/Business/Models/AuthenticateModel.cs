using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Business.Models {
    public class CreateUserModel {
        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Agency { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
