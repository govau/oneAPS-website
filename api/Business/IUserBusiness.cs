using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IUserBusiness {
        Task<string> AuthenticateAsync(AuthenticateModel model);
        Task<UserModel> RegisterAsync(CreateUserModel model);
        Task<IEnumerable<UserModel>> GetAllAsync();
        Task<UserModel> GetByIdAsync(int id);
        Task<UserModel> GetByEmailAsync(string email);
    }
}
