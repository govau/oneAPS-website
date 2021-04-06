using Dta.OneAps.Api.Shared;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Dta.OneAps.Api.Web.Utils {
    public class AuthorizationUtil : IAuthorizationUtil {
        public bool IsUserInRole(ClaimsPrincipal user, string role) => user.IsInRole(Roles.Admin);
        public bool IsUserTheSame(ClaimsPrincipal user, int id) {
            var currentUserId = int.Parse(user.FindFirstValue("Id"));
            if (id == currentUserId) {
                return true;
            }
            return false;
        }
    }
}
