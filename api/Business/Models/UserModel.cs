using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Business.Models {
    public class UserModel {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }
    }
}
