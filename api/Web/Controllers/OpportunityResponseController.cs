using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using System.Threading.Tasks;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Text.Json;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize]
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
                        try {
                            return Ok(await _opportunityResponseBusiness.UploadFile(id, file.FileName, stream, user));
                        } catch (UnauthorisedException) {
                            return Forbid();
                        } catch (NotFoundException) {
                            return NotFound();
                        }
                    }
                }
            }
            return BadRequest();
        }

        // [HttpPost]
        // public async Task<IActionResult> Upsert([FromBody] OpportunityResponseSaveRequest model) {
        //     var user = await _authorizationUtil.GetUser(User);
        //     var created = await _opportunityResponseBusiness.Upsert(model, user);
        //     return Ok(created);
        // }

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
            if (user.Id != model.UserId) {
                return Forbid();
            }
            var updated = await _opportunityResponseBusiness.Update(model, user);
            return Ok(updated);
        }

        [HttpPut("{id}/apply")]
        public async Task<IActionResult> Apply(int id, [FromBody] OpportunityResponseApplyRequest model) {
            var user = await _authorizationUtil.GetUser(User);
            if (user.Id != model.UserId) {
                return Forbid();
            }
            var updated = await _opportunityResponseBusiness.Apply(model, user);
            return Ok(updated);
        }

        [HttpGet("{id}/download")]
        public async Task<IActionResult> Get(int id, [FromQuery] string filename) {
            if (string.IsNullOrWhiteSpace(filename)) {
                return NotFound();
            }
            var user = await _authorizationUtil.GetUser(User);
            try {
                var stream = await _opportunityResponseBusiness.DownloadFile(id, user);
                return File(stream, "application/octet-stream");
            } catch (UnauthorisedException) {
                return Forbid();
            } catch (NotFoundException) {
                return NotFound();
            }
        }
        
        [HttpDelete("{id}/deletefile")]
        public async Task<IActionResult> DeleteFile(int id, [FromQuery] string filename) {
            if (string.IsNullOrWhiteSpace(filename)) {
                return NotFound();
            }
            var user = await _authorizationUtil.GetUser(User);
            try {
                var response = await _opportunityResponseBusiness.DeleteFile(id, filename, user);
                return Ok(response);
            } catch (UnauthorisedException) {
                return Forbid();
            } catch (NotFoundException) {
                return NotFound();
            }
        }
    }
}
