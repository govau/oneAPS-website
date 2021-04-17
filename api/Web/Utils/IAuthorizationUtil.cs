using System.Security.Claims;
using Dta.OneAps.Api.Shared;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Utils {
    public interface IAuthorizationUtil {
        bool IsUserInRole(ClaimsPrincipal user, string role);
        bool IsUserTheSame(ClaimsPrincipal user, int id);
        Task<IUser> GetUser(ClaimsPrincipal claimsPrincipal);
    }
}
