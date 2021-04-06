using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Business.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
