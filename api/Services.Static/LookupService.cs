using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Static {
    public class LookupService : ILookupService {

        public LookupService() { }

        public IEnumerable<Lookup> Get(string name) {
            switch (name) {
                case "OpportunityStatus":
                    return OpportunityStatus.List;
            }
            return null;
        }
    }
}
