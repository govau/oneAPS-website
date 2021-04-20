using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business {
    public interface IUserBusiness {
        Task<UserSessionResponse> AuthenticateAsync(AuthenticateUserRequest model);
        Task<IUser> RegisterAsync(UserCreateRequest model);
        Task<IEnumerable<IUser>> GetAllAsync();
        Task<UserResponse> GetByIdAsync(int id);
        Task<IUser> GetByEmailAsync(string email);
    }
}
