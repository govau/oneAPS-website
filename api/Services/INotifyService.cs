using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services {
    public interface INotifyService {
        Task SuccessfullyApplied(Opportunity opportunity, Lookup agency, IUser user);
        Task EmailVerification(IUser user, UserClaim userClaim);
        Task ResendEmailVerification(IUser user, UserClaim userClaim);
        Task VerifyResetPassword(IUser user, UserClaim userClaim);
        Task ResetPassword(IUser user);
        
    }
}
