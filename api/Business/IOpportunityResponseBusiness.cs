using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Shared;
using System.IO;

namespace Dta.OneAps.Api.Business {
    public interface IOpportunityResponseBusiness {
        Task<OpportunityResponseSaveResponse> Create(OpportunityResponseSaveRequest opportunityModel, IUser user);
        Task<OpportunityResponseSaveResponse> Update(OpportunityResponseSaveRequest opportunityModel, IUser user);
        Task<OpportunityResponseSaveResponse> UploadFile(int id, string filename, Stream stream, IUser user);
        Task<byte[]> DownloadFile(int id, IUser user);
        Task<OpportunityResponseSaveResponse> DeleteFile(int id, string filename, IUser user);
        Task<OpportunityResponseSaveResponse> Apply(OpportunityResponseApplyRequest model, IUser user);
        Task<IEnumerable<OpportunityResponsePublicResponse>> ListByOpportunityId(int opportunityId);

        Task<OpportunityResponsePrivateResponse> Get(int opportunityId, int userId);
        Task<OpportunityResponsePrivateResponse> Get(int id);
        Task<IEnumerable<OpportunityResponsePublicResponse>> MyList(IUser user);
    }
}
