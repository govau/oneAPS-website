using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IApiKeyBusiness {
        Task<string> GenerateTokenAsync(int userId);
        Task<bool> RevokeAsync(string apiKey);
    }
}
