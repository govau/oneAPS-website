using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Business.Models {
    public class AuthenticateUserRequest {
        public string EmailAddress { get; set; }

        public string Password { get; set; }
    }
}