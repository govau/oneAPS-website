using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services {
    public interface IOpportunityService {
        Task<Opportunity> Create(Opportunity opportunity, IUser user);
        Task<Opportunity> Update(Opportunity opportunity, IUser user);
        Task<IEnumerable<Opportunity>> GetAll(string search, bool includeClosed, bool includeUnpublished);
        Task<IEnumerable<Opportunity>> MyList(IUser user);
        Task<Opportunity> GetById(int id, bool includeUnpublished);
    }
}
