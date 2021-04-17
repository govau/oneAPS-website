using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityBusiness {
        Task<OpportunityPublicResponse> Create(OpportunitySaveRequest opportunityModel, IUser user);
        Task<OpportunityPublicResponse> Update(OpportunitySaveRequest opportunityModel, IUser user);
        Task<IEnumerable<OpportunityAdminResponse>> ListAll(IUser user);
        Task<IEnumerable<OpportunityPublicResponse>> List();
        Task<OpportunityPublicResponse> Get(int id);
    }
}
