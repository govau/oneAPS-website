using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services {
    public interface INotifyService {
        Task SuccessfullyApplied(Opportunity opportunity, Lookup agency, IUser user);
        Task RegistrationConfirmation(IUser user, UserClaim userClaim);
    }
}
