using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityBusiness {
        Task<IEnumerable<OpportunityAdminResponse>> ListAll(IUser user);
        Task<OpportunityPublicResponse> Get(int id);
        Task<IEnumerable<OpportunityPublicResponse>> List(string search);
        Task<OpportunityAuthResponse> Create(OpportunityCreateRequest opportunityModel, IUser user);
        Task<OpportunityAuthResponse> Update(OpportunityUpdateRequest opportunityModel, IUser user);
        Task<OpportunityAuthResponse> Close(int id, IUser user);
        Task<OpportunityAuthResponse> Get(int id, IUser user);
        Task<IEnumerable<OpportunityAuthResponse>> List(string search, IUser user);
        Task<IEnumerable<OpportunityResponsePrivateResponse>> ListResponses(int opportunityId, IUser user);
        Task<IEnumerable<OpportunityAuthResponse>> MyList(IUser user);
    }
}
