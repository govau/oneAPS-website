using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using System.Security.Claims;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AgencyController : ControllerBase {
        private readonly IAgencyBusiness _agencyBusiness;

        public AgencyController(IAgencyBusiness agencyBusiness, IAuthorizationUtil authorizationUtil) {
            _agencyBusiness = agencyBusiness;
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetAgenciesAsync() {
            var users = await _agencyBusiness.GetAgenciesAsync();
            return Ok(users);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAgencyAsync(int id) {
            var agency = await _agencyBusiness.GetAgencyAsync(id);
            if (agency == null) {
                return NotFound();
            }
            return Ok(agency);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<IActionResult> UpdateAgencyAsync([FromBody]AgencyModel model) {
            var result = await _agencyBusiness.UpdateAsync(model.Id, model, User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (!result){
                return BadRequest();
            }
            return Ok();
        }
    }
}
