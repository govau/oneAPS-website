using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business.Models {
    public class UserResponse : IUser {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string Role { get; set; }
        public string Agency { get; set; }
        public string Mobile { get; set; }
        public bool Active { get; set; }
    }
}
