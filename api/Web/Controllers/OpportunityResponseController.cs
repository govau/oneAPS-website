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
    [Route("api/[controller]")]
    public class OpportunityResponseController : ControllerBase {
        private readonly IAuthorizationUtil _authorizationUtil;
        private readonly IOpportunityResponseBusiness _opportunityResponseBusiness;

        public OpportunityResponseController(IOpportunityResponseBusiness opportunityResponseBusiness, IAuthorizationUtil authorizationUtil) {
            _opportunityResponseBusiness = opportunityResponseBusiness;
            _authorizationUtil = authorizationUtil;
        }
        [HttpPost("fileupload")]
        public async Task<IHttpActionResult> Upload() {
            if (!Request.Content.IsMimeMultipartContent()) {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            foreach (var file in provider.Contents) {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();
                //Do whatever you want with filename and its binary data.
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OpportunityResponseSaveRequest model) {
            var user = await _authorizationUtil.GetUser(User);
            var created = await _opportunityResponseBusiness.Create(model, user);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OpportunityResponseSaveRequest model) {
            var user = await _authorizationUtil.GetUser(User);
            var updated = await _opportunityResponseBusiness.Update(model, user);
            return Ok(updated);
        }

        [HttpGet]
        public async Task<IActionResult> ListByOpportunityId(int opportunityId) => Ok(await _opportunityResponseBusiness.ListByOpportunityId(opportunityId));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            var opportunity = await _opportunityResponseBusiness.Get(id);
            if (opportunity == null) {
                return NotFound();
            }

            return Ok(opportunity);
        }
    }
}
