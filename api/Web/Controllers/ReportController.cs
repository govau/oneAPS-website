using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase {
        private readonly IReportBusiness _reportBusiness;

        public ReportController(IReportBusiness reportBusiness) {
            _reportBusiness = reportBusiness;
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        public async Task<IActionResult> Get() {
            return Ok(await _reportBusiness.Get());
        }
    }
}
