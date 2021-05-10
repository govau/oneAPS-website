using System;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business.Models {
    public class OpportunityResponsePrivateResponse : OpportunityResponseResponse {

        public string Agency { get; set; }

        public string PhoneNumber { get; set; }

        public string WhyPickMe { get; set; }

        public string ResumeLink { get; set; }

        public string ResumeUpload { get; set; }

        public UserResponse User { get; set; }
        public OpportunityPublicResponse Opportunity { get; set; }
    }
}
