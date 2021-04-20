namespace Dta.OneAps.Api.Shared {
    public interface IUser {
        int Id { get; set; }
        string Name { get; set; }
        string EmailAddress { get; set; }
        string Role { get; set; }
        string Agency { get; set; }
        bool Active { get; set; }
    }
}
