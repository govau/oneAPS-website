using System;

namespace Dta.OneAps.Api.Business.Models {
    public class OpportunityResponsePublicResponse : OpportunityResponseResponse {
        public OpportunityPublicResponse Opportunity { get; set; }
    }
}
