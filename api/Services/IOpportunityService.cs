using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IOpportunityService {
        Task<Opportunity> Create(Opportunity user, User creatorUser);
        Task<Opportunity> Update(Opportunity user, User modiferUser);
        Task<IEnumerable<Opportunity>> GetAllAsync();
        Task<Opportunity> GetByIdAsync(int id);
    }
}
