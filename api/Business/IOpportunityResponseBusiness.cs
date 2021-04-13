using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityResponseBusiness {
        Task<OpportunityResponseSaveResponse> Create(OpportunityResponseSaveRequest opportunityModel, UserResponse creatorUser);
        Task<OpportunityResponseSaveResponse> Update(OpportunityResponseSaveRequest opportunityModel, UserResponse modiferUser);
        Task<IEnumerable<OpportunityResponsePublicResponse>> ListByOpportunityId(int opportunityId);

        Task<IEnumerable<OpportunityResponsePublicResponse>> List(int opportunityId, int userId);
        Task<OpportunityResponsePublicResponse> Get(int id);
    }
}
