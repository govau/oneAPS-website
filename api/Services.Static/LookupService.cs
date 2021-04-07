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
                case "Skills":
                    return Skill.List;
                case "SecurityClearance":
                    return SecurityClearance.List;
                case "Agency":
                    return Agency.List;
            }
            return null;
        }
        public Lookup Get(string name, string value) {
            var list = Get(name);
            return list.SingleOrDefault(i => i.Value == value);
        }
    }
}
