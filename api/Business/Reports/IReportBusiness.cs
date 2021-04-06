using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Business.Reports {
    public interface IReportBusiness {
        Task<IEnumerable<dynamic>> GetAgenciesAsync();
        Task<IEnumerable<dynamic>> GetPublishedOpportunitysAsync();
        Task<IEnumerable<dynamic>> GetSubmittedOpportunityResponsesAsync();
        Task<IEnumerable<dynamic>> GetFeedbacksAsync();
        Task<IEnumerable<dynamic>> GetSuppliersAsync();
    }
}
