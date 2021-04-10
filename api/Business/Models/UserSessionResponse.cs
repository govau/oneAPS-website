using System.ComponentModel.DataAnnotations;

namespace Dta.OneAps.Api.Business.Models {
    public class UserSessionResponse {
        public string Token { get; set; }

        public string RefreshToken { get; set; }
    }
}