using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Static {
    public static class SecurityClearance {
        public static List<Lookup> List = new List<Lookup> {
            new Lookup() {Key = "None", Value = "None"},
            new Lookup() {Key = "Baseline", Value = "Baseline"},
            new Lookup() {Key = "NegativeVettingLevel1", Value = "Negative Vetting Level 1"},
            new Lookup() {Key = "NegativeVettingLevel2", Value = "Negative Vetting Level 2"},
        };
    }
}
