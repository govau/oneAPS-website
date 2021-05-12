namespace Dta.OneAps.Api.Business.Models {
    public class EmailVerificationRequest {
        public string VerificationCode { get; set; }
        public int UserId {get;set;}
    }
}
