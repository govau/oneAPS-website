using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityBusiness {
        Task<OpportunityPublicResponse> Create(OpportunitySaveRequest opportunityModel, UserResponse creatorUser);
        Task<OpportunityPublicResponse> Update(OpportunitySaveRequest opportunityModel, UserResponse modiferUser);
        Task<IEnumerable<OpportunityAdminResponse>> ListAll();
        Task<IEnumerable<OpportunityPublicResponse>> List();
        Task<OpportunityPublicResponse> Get(int id);
    }
}
