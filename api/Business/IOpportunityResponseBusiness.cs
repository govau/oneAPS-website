using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityResponseBusiness {
        Task<OpportunityResponseSaveResponse> Create(OpportunityResponseSaveRequest opportunityModel, UserResponse creatorUser);
        Task<OpportunityResponseSaveResponse> Update(OpportunityResponseSaveRequest opportunityModel, UserResponse modiferUser);
        Task<IEnumerable<OpportunityPublicResponse>> ListByOpportunityId(int opportunityId);

        Task<IEnumerable<OpportunityPublicResponse>> List(int opportunityId, int userId);
        Task<OpportunityPublicResponse> Get(int id);
    }
}
