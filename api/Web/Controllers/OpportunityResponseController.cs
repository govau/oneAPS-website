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
        // [HttpPost("fileupload")]
        // public async Task<IActionResult> Upload() {
            
        //     if (!Request.Content.IsMimeMultipartContent()) {
        //         throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        //     }

        //     var provider = new MultipartMemoryStreamProvider();
        //     await Request.Content.ReadAsMultipartAsync(provider);
        //     foreach (var file in provider.Contents) {
        //         var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
        //         var buffer = await file.ReadAsByteArrayAsync();
        //         //Do whatever you want with filename and its binary data.
        //     }

        //     return Ok();
        // }
        [HttpPost("fileupload"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload() {
            var processedFiles = new List<string>();
            // var value = await Request.BodyReader.ReadAsync();
            Request.Form.TryGetValue("userId", out var userId);
            processedFiles.Add(userId);
            foreach (var file in Request.Form.Files) {
                // var file = Request.Form.Files[0];
                // var folderName = Path.Combine("Resources", "Images");
                // var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0) {
                    
                    // var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    // var fullPath = Path.Combine(pathToSave, fileName);
                    // var dbPath = Path.Combine(folderName, fileName);
                    // using (var stream = new FileStream(fullPath, FileMode.Create)) {
                    //     file.CopyTo(stream);
                    // }
                    // return Ok(new { dbPath });
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

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Create() {
            var user = await _authorizationUtil.GetUser(User);

            Request.Form.TryGetValue("data", out var data);
            var model = JsonSerializer.Deserialize<OpportunityResponseSaveRequest>(data, new JsonSerializerOptions() {
                PropertyNameCaseInsensitive = true
            });
            Console.WriteLine(data);
            Console.WriteLine(model.OpportunityId);
            foreach (var file in Request.Form.Files) {
                if (file.Length > 0) {
                    using (var stream = new MemoryStream()) {
                        await file.CopyToAsync(stream);
                    }
                    
                } else {
                    return BadRequest();
                }
            }

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
