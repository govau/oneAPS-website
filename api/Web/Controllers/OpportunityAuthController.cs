using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Web.Filters;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
    [ApiController]
    [Route("api/auth/Opportunity")]
    public class OpportunityAuthController : ControllerBase {
        private readonly IAuthorizationUtil _authorizationUtil;
        private readonly IOpportunityBusiness _opportunityBusiness;

        public OpportunityAuthController(IOpportunityBusiness opportunityBusiness, IAuthorizationUtil authorizationUtil) {
            _opportunityBusiness = opportunityBusiness;
            _authorizationUtil = authorizationUtil;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OpportunitySaveRequest model) {
            var user = await _authorizationUtil.GetUser(User);
            var created = await _opportunityBusiness.Create(model, user);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OpportunitySaveRequest model) {
            var user = await _authorizationUtil.GetUser(User);
            var updated = await _opportunityBusiness.Update(model, user);
            return Ok(updated);
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] string search) {
            var user = await _authorizationUtil.GetUser(User);
            return Ok(await _opportunityBusiness.List(search, user));
        }

        [HttpGet("my")]
        public async Task<IActionResult> MyList() {
            var user = await _authorizationUtil.GetUser(User);
            return Ok(await _opportunityBusiness.MyList(user));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {      
            var user = await _authorizationUtil.GetUser(User);      
            return Ok(await _opportunityBusiness.Get(id, user));
        }

        [HttpGet("{id}/responses")]
        public async Task<IActionResult> GetResponses(int id) {      
            var user = await _authorizationUtil.GetUser(User);      
            return Ok(await _opportunityBusiness.ListResponses(id, user));
        }
    }
}
