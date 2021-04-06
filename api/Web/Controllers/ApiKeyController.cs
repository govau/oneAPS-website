using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ApiKeyController : ControllerBase {
        private readonly IApiKeyBusiness _apiKeyBusiness;

        public ApiKeyController(IApiKeyBusiness apiKeyBusiness) {
            _apiKeyBusiness = apiKeyBusiness;
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPost("generate-token")]
        public async Task<IActionResult> GenerateTokenAsync([FromQuery] int userId) {
            var token = await _apiKeyBusiness.GenerateTokenAsync(userId);
            return Ok(token);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPost("revoke")]
        public async Task<IActionResult> GetByIdAsync([FromQuery] string apiKey) {
            var success = await _apiKeyBusiness.RevokeAsync(apiKey);
            if (success) {
                return Ok();
            } else {
                return BadRequest();
            }
        }
    }
}
