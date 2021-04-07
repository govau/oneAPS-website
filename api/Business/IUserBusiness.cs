using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IUserBusiness {
        Task<string> AuthenticateAsync(AuthenticateUserRequest model);
        Task<UserResponse> RegisterAsync(CreateUserRequest model);
        Task<IEnumerable<UserResponse>> GetAllAsync();
        Task<UserResponse> GetByIdAsync(int id);
        Task<UserResponse> GetByEmailAsync(string email);
    }
}
