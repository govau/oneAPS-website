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

        public OpportunityResponseController(IOpportunityResponseBusiness opportunityResponseBusiness, IAuthorizationUtil authorizationUtil) {
            _opportunityResponseBusiness = opportunityResponseBusiness;
            _authorizationUtil = authorizationUtil;
        }
        
        [HttpPost("fileupload"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload([FromQuery] int opportunityId) {
            var user = await _authorizationUtil.GetUser(User);
            var processedFiles = new List<string>();
            foreach (var file in Request.Form.Files) {
                if (file.Length > 0) {
                    using (var stream = new MemoryStream()) {
                        await file.CopyToAsync(stream);
                    }
                    processedFiles.Add(file.FileName);
                } else {
                    return BadRequest();
                } 
            }
            return Ok(processedFiles);
            
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
            var updated = await _opportunityResponseBusiness.Update(model, user);
            return Ok(updated);
        }

        [HttpPut("{id}/apply")]
        public async Task<IActionResult> Apply(int id) {
            var user = await _authorizationUtil.GetUser(User);
            var updated = await _opportunityResponseBusiness.Apply(id, user);
            return Ok(updated);
        }

        // [HttpGet]
        // public async Task<IActionResult> ListByOpportunityId(int opportunityId) => Ok(await _opportunityResponseBusiness.ListByOpportunityId(opportunityId));

        // [HttpGet("{id}")]
        // public async Task<IActionResult> Get(int id) {
        //     var user = await _authorizationUtil.GetUser(User);
        //     var opportunityResponse = await _opportunityResponseBusiness.Get(id);
        //     if (user.Id != opportunityResponse.userId) {
        //         return Unauthorized();
        //     }

        //     if (opportunityResponse == null) {
        //         return NotFound();
        //     }

        //     return Ok(opportunityResponse);
        // }
    }
}
