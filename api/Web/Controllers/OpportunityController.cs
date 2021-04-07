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
    public class OpportunityController : ControllerBase {
        private readonly IAuthorizationUtil _authorizationUtil;
        private readonly IOpportunityBusiness _opportunityBusiness;

        public OpportunityController(IOpportunityBusiness opportunityBusiness, IAuthorizationUtil authorizationUtil) {
            _opportunityBusiness = opportunityBusiness;
            _authorizationUtil = authorizationUtil;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OpportunityModel model) {
            var user = await _opportunityBusiness.Create(model);
            return Ok(user);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _opportunityBusiness.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id) {
            var opportunity = await _opportunityBusiness.GetByIdAsync(id);
            if (opportunity == null) {
                return NotFound();
            }

            return Ok(opportunity);
        }
    }
}
