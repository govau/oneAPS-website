using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using Dta.OneAps.Api.Web.Filters;
using System.Threading.Tasks;
using System.IO;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
    [CustomException]
    [ApiController]
    [Route("api/[controller]")]
    public class OpportunityResponseController : ControllerBase {
        private readonly IAuthorizationUtil _authorizationUtil;
        private readonly IOpportunityResponseBusiness _opportunityResponseBusiness;
        private readonly IFileBusiness _fileBusiness;

        public OpportunityResponseController(IOpportunityResponseBusiness opportunityResponseBusiness, IFileBusiness fileBusiness, IAuthorizationUtil authorizationUtil) {
            _opportunityResponseBusiness = opportunityResponseBusiness;
            _authorizationUtil = authorizationUtil;
            _fileBusiness = fileBusiness;
        }

        [HttpPost("{id}/fileupload"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(int id) {
            var user = await _authorizationUtil.GetUser(User);
            foreach (var file in Request.Form.Files) {
                if (file.Length > 0) {
                    using (var stream = new MemoryStream()) {
                        await file.CopyToAsync(stream);
                        return Ok(await _opportunityResponseBusiness.UploadFile(id, file.FileName, stream, user));
                    }
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OpportunityResponseSaveRequest request) {
            var user = await _authorizationUtil.GetUser(User);
            var newOpportunityResponse = new OpportunityResponseSaveRequest() {
                OpportunityId = request.OpportunityId,
                UserId = user.Id
            };
            var opportunityResponse = await _opportunityResponseBusiness.Create(newOpportunityResponse, user);

            return Ok(opportunityResponse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OpportunityResponseSaveRequest model) {
            var user = await _authorizationUtil.GetUser(User);
            var updated = await _opportunityResponseBusiness.Update(model, user);
            return Ok(updated);
        }

        [HttpPut("{id}/apply")]
        public async Task<IActionResult> Apply(int id, [FromBody] OpportunityResponseApplyRequest model) {
            var user = await _authorizationUtil.GetUser(User);
            var updated = await _opportunityResponseBusiness.Apply(model, user);
            return Ok(updated);
        }

        [HttpGet("{id}/download")]
        public async Task<IActionResult> Get(int id, [FromQuery] string filename) {
            if (string.IsNullOrWhiteSpace(filename)) {
                return NotFound();
            }
            var user = await _authorizationUtil.GetUser(User);
            var stream = await _opportunityResponseBusiness.DownloadFile(id, user);
            return File(stream, "application/octet-stream");
        }

        [HttpDelete("{id}/deletefile")]
        public async Task<IActionResult> DeleteFile(int id, [FromQuery] string filename) {
            if (string.IsNullOrWhiteSpace(filename)) {
                return NotFound();
            }
            var user = await _authorizationUtil.GetUser(User);
            var response = await _opportunityResponseBusiness.DeleteFile(id, filename, user);
            return Ok(response);
        }

        [HttpGet("my")]
        public async Task<IActionResult> MyList() {
            var user = await _authorizationUtil.GetUser(User);
            var response = await _opportunityResponseBusiness.MyList(user);
            return Ok(response);
        }
    }
}
