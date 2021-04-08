using System.Security.Claims;
using Dta.OneAps.Api.Business.Models;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Utils {
    public interface IAuthorizationUtil {
        bool IsUserInRole(ClaimsPrincipal user, string role);
        bool IsUserTheSame(ClaimsPrincipal user, int id);
        Task<UserResponse> GetUser(ClaimsPrincipal claimsPrincipal);
    }
}
