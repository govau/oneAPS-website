using Dta.OneAps.Api.Shared;
using System.Security.Claims;

namespace Dta.OneAps.Api.Web.Utils {
    public class AuthorizationUtil : IAuthorizationUtil {
        public bool IsUserInRole(ClaimsPrincipal user, string role) => user.IsInRole(Roles.Admin);
        public bool IsUserTheSame(ClaimsPrincipal user, int id) {
            var currentUserId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));
            if (id == currentUserId) {
                return true;
            }
            return false;
        }
    }
}
