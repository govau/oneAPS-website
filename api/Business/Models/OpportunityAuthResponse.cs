using System;

namespace Dta.OneAps.Api.Business.Models {
    public class OpportunityAuthResponse : OpportunityResponseBase {
        public string ContactPersonName { get; set; }
        public string ContactPersonPhone { get; set; }
        public string ContactPersonEmail { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public bool CanModify { get; set; }
        public bool CanApply { 
            get {
                return ClosedAt.HasValue == false;
            }
        }
        public int NumberOfResponses { get; set; }
    }
}
