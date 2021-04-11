using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Static {
    public class LookupService : ILookupService {

        public LookupService() { }

        public IEnumerable<Lookup> Get(string name) {
            switch (name.ToLower()) {
                case "opportunitystatus":
                    return OpportunityStatus.List;
                case "skills":
                    return Skill.List;
                case "securityclearance":
                    return SecurityClearance.List;
                case "agency":
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
