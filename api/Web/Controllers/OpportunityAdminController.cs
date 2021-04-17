using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Web.Filters;
using Dta.OneAps.Api.Web.Utils;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize(Roles = Roles.Admin)]
    [CustomException]
    [ApiController]
    [Route("api/[controller]")]
    public class OpportunityAdminController : ControllerBase {
        private readonly IAuthorizationUtil _authorizationUtil;
        private readonly IOpportunityBusiness _opportunityBusiness;

        public OpportunityAdminController(IOpportunityBusiness opportunityBusiness, IAuthorizationUtil authorizationUtil) {
            _opportunityBusiness = opportunityBusiness;
            _authorizationUtil = authorizationUtil;
        }

        [HttpGet]
        public async Task<IActionResult> List() {
            var user = await _authorizationUtil.GetUser(User);
            return Ok(await _opportunityBusiness.ListAll(user));
        }
    }
}
