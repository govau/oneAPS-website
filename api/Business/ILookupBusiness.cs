using System.Collections.Generic;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface ILookupBusiness {
        IEnumerable<LookupModel> Get(string name);
    }
}
