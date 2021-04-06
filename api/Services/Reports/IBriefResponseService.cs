using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Services.Reports {
    public interface IOpportunityResponseService {
        Task<IEnumerable<dynamic>> GetSubmittedOpportunityResponsesAsync();
    }
}
