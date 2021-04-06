using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using Dta.OneAps.Api.Business;

namespace Dta.OneAps.Api.Web.Handlers {
    public class UserAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions> {
        private readonly IUserSessionBusiness _userSessionBusiness;
        private readonly IUserBusiness _userBusiness;

        public UserAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IUserSessionBusiness userSessionBusiness,
            IUserBusiness userBusiness)
            : base(options, logger, encoder, clock) {
            _userSessionBusiness = userSessionBusiness;
            _userBusiness = userBusiness;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync() {
            if (!Request.Headers.ContainsKey("SessionToken")) {
                return AuthenticateResult.Fail("Session required");
            }

            var token = Request.Headers["SessionToken"];
            var user = await _userSessionBusiness.GetSessionAsync(token);
            if (user == null) {
                return AuthenticateResult.Fail("Session has expired");
            }

            var identity = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, $"{user.Id}"),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.EmailAddress),
                new Claim(ClaimTypes.Role, user.Role)
            }, Scheme.Name);

            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}
