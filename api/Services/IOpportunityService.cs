using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services {
    public interface IOpportunityService {
        Task<Opportunity> Create(Opportunity opportunity, IUser user);
        Task<Opportunity> Update(Opportunity opportunity, IUser user);
        Task<IEnumerable<Opportunity>> GetAllAsync();
        Task<Opportunity> GetByIdAsync(int id);
    }
}
