using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface ILookupService {
        IEnumerable<Lookup> Get(string name);
        Lookup Get(string name, string value);
    }
}
