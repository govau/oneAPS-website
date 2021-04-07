using System.Collections.Generic;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface ILookupBusiness {
        IEnumerable<LookupResponse> Get(string name);
        LookupResponse Get(string name, string value);
    }
}
