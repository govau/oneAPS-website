namespace Dta.OneAps.Api.Business.Models {
    public class UserModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }
        public long? SupplierCode { get; set; }
        public long? ApplicationId { get; set; }
        public int? AgencyId { get; set; }
        public string Token { get; set; }
    }
}
