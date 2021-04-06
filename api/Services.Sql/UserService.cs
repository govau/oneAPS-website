using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public class UserService : IUserService {
        private readonly OneApsContext _context;

        public UserService(OneApsContext context) {
            _context = context;
        }

        public async Task<User> AuthenticateAsync(string username, string password) => (
            await _context
                .User
                .AsNoTracking()
                .Where(u =>
                    u.EmailAddress == username &&
                    u.Password == password &&
                    u.FailedLoginCount <= 5 &&
                    u.Active == true
                )
                .SingleOrDefaultAsync()
        );

        public async Task<User> RegisterAsync(User user) {
            var result = await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<IEnumerable<User>> GetAllAsync() => await _context.User.ToListAsync();
        public async Task<User> GetByIdAsync(int id) => await _context.User.Where(x => x.Id == id).SingleOrDefaultAsync();
    }
}
