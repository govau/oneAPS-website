using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using Dta.OneAps.Api.Web.Filters;
using System;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase {
        private readonly IAuthorizationUtil _authorizationUtil;
        private readonly IUserBusiness _userBusiness;

        public UserController(IUserBusiness userBusiness, IAuthorizationUtil authorizationUtil) {
            _userBusiness = userBusiness;
            _authorizationUtil = authorizationUtil;
        }
        [HttpGet("ping")]
        public IActionResult Ping() {
            return Ok(new UserSessionResponse {
                RefreshToken = Guid.NewGuid().ToString().Replace("-", "")
            });
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateUserRequest model) {
            try {
                var user = await _userBusiness.AuthenticateAsync(model);
                return Ok(user);
            } catch (CannotAuthenticateException) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] UserCreateRequest model) {
            var user = await _userBusiness.RegisterAsync(model);
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyEmail([FromBody] EmailVerificationRequest request) {
            var user = await _authorizationUtil.GetUser(User);
            await _userBusiness.VerifyEmail(request, user);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("resend")]
        public async Task<IActionResult> ResendEmailVerification() {
            var user = await _authorizationUtil.GetUser(User);
            await _userBusiness.ResendEmailVerification(user);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("resetPassword/verify")]
        public async Task<IActionResult> VerifyResetPassword([FromBody] VerifyResetPasswordRequest request) {
            await _userBusiness.VerifyResetPassword(request);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request) {
            await _userBusiness.ResetPassword(request);
            return Ok();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var users = await _userBusiness.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id) {
            if (!_authorizationUtil.IsUserInRole(User, Roles.Admin) && !_authorizationUtil.IsUserTheSame(User, id)) {
                return Forbid();
            }
            var user = await _userBusiness.GetByIdAsync(id);
            if (user == null) {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
