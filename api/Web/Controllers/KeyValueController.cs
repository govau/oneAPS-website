using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using System.Threading.Tasks;
using System.IO;
using System.Text.Json;

namespace Dta.OneAps.Api.Web.Controllers {
    [Authorize(Roles = Roles.Admin)]
    [ApiController]
    [Route("api/[controller]")]
    public class KeyValueController : ControllerBase {
        private readonly IKeyValueBusiness _keyValueBusiness;

        public KeyValueController(IKeyValueBusiness keyValueBusiness) {
            _keyValueBusiness = keyValueBusiness;
        }

        [HttpPost]
        public async Task<IActionResult> Upsert([FromQuery] string key) {
            string content = await new StreamReader(Request.Body).ReadToEndAsync();
            await _keyValueBusiness.Upsert(key, content);
            return Ok();
        }
    }
}
