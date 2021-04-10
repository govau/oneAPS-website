using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Web.Utils;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Web.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class LookupController : ControllerBase {
        private readonly ILookupBusiness _lookupBusiness;

        public LookupController(ILookupBusiness lookupBusiness) {
            _lookupBusiness = lookupBusiness;
        }

        [HttpGet]
        public IActionResult Get(string name) => Ok(_lookupBusiness.Get(name));
    }
}
