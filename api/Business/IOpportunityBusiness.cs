using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityBusiness {
        Task<OpportunityPublicResponse> Create(OpportunitySaveRequest opportunityModel);
        Task<OpportunityPublicResponse> Update(OpportunitySaveRequest opportunityModel);
        Task<IEnumerable<OpportunityAdminResponse>> ListAll();
        Task<IEnumerable<OpportunityPublicResponse>> List();
        Task<OpportunityPublicResponse> Get(int id);
    }
}
