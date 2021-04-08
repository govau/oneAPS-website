namespace Dta.OneAps.Api.Business.Models {
    public class UserCreateRequest {
        public string EmailAddress { get; set; }

        public string Name { get; set; }

        public string Agency { get; set; }

        public string Password { get; set; }
    }
}
