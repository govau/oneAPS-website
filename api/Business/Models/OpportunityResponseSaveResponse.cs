using System;

namespace Dta.OneAps.Api.Business.Models {
    public class OpportunityResponseSaveResponse {
        public int Id { get; set; }
        public int OpportunityId { get; set; }

        public string Agency { get; set; }

        public string PhoneNumber { get; set; }

        public string WhyPickMe { get; set; }

        public string ResumeLink { get; set; }

        public string ResumeUpload { get; set; }

        public UserResponse User { get; set; }
        
        public OpportunityPublicResponse Opportunity { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? WithdrawnAt { get; set; }
        public DateTime? SubmittedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
