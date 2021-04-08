using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Business.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Utils {
    public class AuthorizationUtil : IAuthorizationUtil {
        private readonly IUserBusiness _userBusiness;
        public AuthorizationUtil(IUserBusiness userBusiness) {
            _userBusiness = userBusiness;
        }
        public bool IsUserInRole(ClaimsPrincipal claimsPrincipal, string role) => claimsPrincipal.IsInRole(Roles.Admin);
        public bool IsUserTheSame(ClaimsPrincipal claimsPrincipal, int id) {
            var userId = int.Parse(claimsPrincipal.FindFirstValue("Id"));
            if (id == userId) {
                return true;
            }
            return false;
        }
        public async Task<UserResponse> GetUser(ClaimsPrincipal claimsPrincipal) {
            var userId = int.Parse(claimsPrincipal.FindFirstValue("Id"));
            var user = await _userBusiness.GetByIdAsync(userId);
            return user;
        }
    }
}
