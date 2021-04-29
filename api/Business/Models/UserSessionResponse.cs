using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Business.Models {
    public class UserSessionResponse {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string Role { get; set; }
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
    }
}