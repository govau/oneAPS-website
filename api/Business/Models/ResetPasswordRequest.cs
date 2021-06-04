namespace Dta.OneAps.Api.Business.Models {
    public class ResetPasswordRequest {
        public string Password { get; set; }
        public string RetypePassword { get; set; }        
        public string VerificationCode { get; set; }
    }
}
