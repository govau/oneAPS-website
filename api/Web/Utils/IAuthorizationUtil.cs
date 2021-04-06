using System.Security.Claims;

namespace Dta.OneAps.Api.Web.Utils {
    public interface IAuthorizationUtil {
        bool IsUserInRole(ClaimsPrincipal user, string role);
        bool IsUserTheSame(ClaimsPrincipal user, int id);
    }
}
