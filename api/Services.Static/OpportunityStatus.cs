using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Static {
    public static class OpportunityStatus {
        public static List<Lookup> List = new List<Lookup> {
            new Lookup() {Value = "pendingApproval", Text = "Pending Approval"},
            new Lookup() {Value = "open", Text = "Open"},
            new Lookup() {Value = "closed", Text = "Closed"},
            new Lookup() {Value = "deleted", Text = "Deleted"},
        };
    }
}
