using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase {
        private readonly IAuthorizationUtil _authorizationUtil; 
        private readonly IUserBusiness _userBusiness;

        public UserController(IUserBusiness userBusiness, IAuthorizationUtil authorizationUtil) {
            _userBusiness = userBusiness;
            _authorizationUtil = authorizationUtil;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody]AuthenticateModel model) {
            try {
                var user = await _userBusiness.AuthenticateAsync(model);
                return Ok(user);
            } catch (CannotAuthenticateException) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody]UserModel model) {
            try {
                var user = await _userBusiness.RegisterAsync(model, "test");
                return Ok(user);
            } catch (CannotAuthenticateException) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
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
            System.Console.WriteLine("############################");
            System.Console.WriteLine(User);
            System.Console.WriteLine("############################");
            var user = await _userBusiness.GetByIdAsync(id);
            if (user == null) {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
