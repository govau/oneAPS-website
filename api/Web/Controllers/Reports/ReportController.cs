using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business.Reports;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers.Reports {
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ReportController : ControllerBase {
        private readonly IReportBusiness _reportBusiness;
        public ReportController(IReportBusiness reportBusiness) {
            _reportBusiness = reportBusiness;
        }
        [Authorize(AuthenticationSchemes = Schemes.ApiKeyAuthenticationHandler)]
        [HttpGet("agency")]
        public async Task<IActionResult> GetAgenciesAsync(int id) {
            var results = await _reportBusiness.GetAgenciesAsync();
            return Ok(results);
        }
        [Authorize(AuthenticationSchemes = Schemes.ApiKeyAuthenticationHandler)]
        [HttpGet("brief")]
        public async Task<IActionResult> GetPublishedBriefsAsync() {
            var results = await _reportBusiness.GetPublishedBriefsAsync();
            return Ok(results);
        }
        [Authorize(AuthenticationSchemes = Schemes.ApiKeyAuthenticationHandler)]
        [HttpGet("briefresponse")]
        public async Task<IActionResult> GetSubmittedBriefResponsesAsync() {
            var results = await _reportBusiness.GetSubmittedBriefResponsesAsync();
            return Ok(results);
        }
        [Authorize(AuthenticationSchemes = Schemes.ApiKeyAuthenticationHandler)]
        [HttpGet("feedback")]
        public async Task<IActionResult> GetAllFeedbackAsync() {
            var results = await _reportBusiness.GetFeedbacksAsync();
            return Ok(results);
        }
        [Authorize(AuthenticationSchemes = Schemes.ApiKeyAuthenticationHandler)]
        [HttpGet("supplier")]
        public async Task<IActionResult> GetSuppliersAsync() {
            var results = await _reportBusiness.GetSuppliersAsync();
            return Ok(results);
        }
    }
}
