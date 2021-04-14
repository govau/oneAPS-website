using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IOpportunityResponseService {
        Task<OpportunityResponse> Create(OpportunityResponse opportunityResponse, User creatorUser);
        Task<OpportunityResponse> Update(OpportunityResponse opportunityResponse, User modiferUser);
        Task<IEnumerable<OpportunityResponse>> ListByOpportunityId(int opportunityId);
        Task<OpportunityResponse> Get(int opportunityId, int userId);
        Task<OpportunityResponse> GetById(int id);
    }
}
