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
        private readonly IUserClaimBusiness _userClaimBusiness;

        public UserController(IUserBusiness userBusiness, IUserClaimBusiness userClaimBusiness, IAuthorizationUtil authorizationUtil) {
            _userBusiness = userBusiness;
            _userClaimBusiness = userClaimBusiness;
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
        [HttpPost("claim")]
        public async Task<IActionResult> ClaimToken([FromQuery] string token) {
            await _userClaimBusiness.ClaimToken(token);
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
