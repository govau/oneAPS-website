using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityBusiness {
        Task<OpportunityModel> Create(OpportunityModel opportunityModel);
        Task<OpportunityModel> Update(OpportunityModel opportunityModel);
        Task<IEnumerable<OpportunityModel>> ListAll();
        Task<IEnumerable<PublicOpportunityResponse>> List();
        Task<PublicOpportunityResponse> Get(int id);
    }
}
