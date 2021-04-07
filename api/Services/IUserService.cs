using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IUserService {
        Task<User> AuthenticateAsync(string username, string password);
        Task<User> RegisterAsync(User user);
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);
        Task<User> GetByEmailAsync(string email);
    }
}
