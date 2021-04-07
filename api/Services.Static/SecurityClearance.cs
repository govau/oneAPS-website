using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Static {
    public static class SecurityClearance {
        public static List<Lookup> List = new List<Lookup> {
            new Lookup() {Value = "None", Text = "None"},
            new Lookup() {Value = "Baseline", Text = "Baseline"},
            new Lookup() {Value = "NegativeVettingLevel1", Text = "Negative Vetting Level 1"},
            new Lookup() {Value = "NegativeVettingLevel2", Text = "Negative Vetting Level 2"},
        };
    }
}
