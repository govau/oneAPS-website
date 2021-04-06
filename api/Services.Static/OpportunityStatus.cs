using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Static {
    public static class OpportunityStatus {
        public static List<Lookup> List = new List<Lookup> {
            new Lookup() {Key = "pendingApproval", Value = "Pending Approval"},
            new Lookup() {Key = "open", Value = "Open"},
            new Lookup() {Key = "closed", Value = "Closed"},
            new Lookup() {Key = "deleted", Value = "Deleted"},
        };
    }
}
