using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Services.Reports {
    public interface IOpportunityService {
        Task<IEnumerable<dynamic>> GetPublishedOpportunitysAsync();
    }
}
