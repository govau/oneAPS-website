using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IUserSessionBusiness {
        Task<UserResponse> GetSessionAsync(string token);
        Task<string> CreateSessionAsync(UserResponse user);
    }
}
