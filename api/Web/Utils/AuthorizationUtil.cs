using Dta.OneAps.Api.Shared;
using System.Security.Claims;

namespace Dta.OneAps.Api.Web.Utils {
    public class AuthorizationUtil : IAuthorizationUtil {
        public bool IsUserInRole(ClaimsPrincipal user, string role) => user.IsInRole(Roles.Admin);
        public bool IsUserTheSame(ClaimsPrincipal user, int id) {
            System.Console.WriteLine("############################");
            System.Console.WriteLine(user.FindFirstValue(ClaimTypes.NameIdentifier));
            System.Console.WriteLine(user.FindFirstValue(ClaimTypes.Role));
            System.Console.WriteLine("############################");
            var currentUserId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));
            if (id == currentUserId) {
                return true;
            }
            return false;
        }
    }
}
