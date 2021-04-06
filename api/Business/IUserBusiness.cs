using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IUserBusiness {
        Task<string> AuthenticateAsync(AuthenticateModel model);
        Task<UserModel> RegisterAsync(UserModel model, string password);
        Task<IEnumerable<UserModel>> GetAllAsync();
        Task<UserModel> GetByIdAsync(int id);
    }
}
