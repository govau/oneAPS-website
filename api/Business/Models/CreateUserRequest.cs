namespace Dta.OneAps.Api.Business.Models {
    public class CreateUserRequest {
        public string EmailAddress { get; set; }

        public string Name { get; set; }

        public string Agency { get; set; }

        public string Password { get; set; }
    }
}
