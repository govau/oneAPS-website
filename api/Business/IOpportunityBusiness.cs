using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityBusiness {
        Task<IEnumerable<OpportunityAdminResponse>> ListAll(IUser user);
        Task<OpportunityPublicResponse> Get(int id);
        Task<IEnumerable<OpportunityPublicResponse>> List();
        Task<OpportunityAuthResponse> Create(OpportunitySaveRequest opportunityModel, IUser user);
        Task<OpportunityAuthResponse> Update(OpportunitySaveRequest opportunityModel, IUser user);
        Task<OpportunityAuthResponse> Get(int id, IUser user);
        Task<IEnumerable<OpportunityAuthResponse>> List(IUser user);
    }
}
