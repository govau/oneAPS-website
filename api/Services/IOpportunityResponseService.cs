using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services {
    public interface IOpportunityResponseService {
        Task<OpportunityResponse> Create(OpportunityResponse opportunityResponse, IUser user);
        Task<OpportunityResponse> Update(OpportunityResponse opportunityResponse, IUser user);
        Task<IEnumerable<OpportunityResponse>> ListByOpportunityId(int opportunityId);
        Task<OpportunityResponse> Get(int opportunityId, int userId);
        Task<OpportunityResponse> GetById(int id);
    }
}
