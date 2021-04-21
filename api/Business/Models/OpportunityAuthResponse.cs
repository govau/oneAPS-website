using System;

namespace Dta.OneAps.Api.Business.Models {
    public class OpportunityAuthResponse : OpportunityResponseModel {
        public string ContactPersonName { get; set; }
        public string ContactPersonPhone { get; set; }
        public string ContactPersonEmail { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public bool CanModify { get; set; }
    }
}
