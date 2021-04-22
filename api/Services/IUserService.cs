using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IUserService {
        Task<User> Authenticate(string username);
        Task<User> Create(User user);
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(int id);
        Task<User> GetByEmail(string email);
        Task<User> Update(User user);
    }
}
