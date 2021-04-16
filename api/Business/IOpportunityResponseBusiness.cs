using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;
using System.IO;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityResponseBusiness {
        Task<OpportunityResponseSaveResponse> Create(OpportunityResponseSaveRequest opportunityModel, UserResponse creatorUser);
        Task<OpportunityResponseSaveResponse> Update(OpportunityResponseSaveRequest opportunityModel, UserResponse modiferUser);
        Task<OpportunityResponseSaveResponse> UploadFile(int id, string filename, Stream stream, UserResponse modiferUser);
        Task<string> DownloadFile(int id, UserResponse modiferUser);
        Task<OpportunityResponseSaveResponse> Apply(OpportunityResponseApplyRequest model, UserResponse userResponse);
        Task<IEnumerable<OpportunityResponsePublicResponse>> ListByOpportunityId(int opportunityId);

        Task<OpportunityResponsePrivateResponse> Get(int opportunityId, int userId);
        Task<OpportunityResponsePrivateResponse> Get(int id);
    }
}
