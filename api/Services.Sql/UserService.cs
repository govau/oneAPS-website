using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public class UserService : DatabaseOperationService, IUserService {
        private readonly OneApsContext _context;

        public UserService(OneApsContext context) : base (context) {
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

        public async Task<User> Create(User user) {
            var saved = await base.CreateAsync<User>(user);
            await base.CommitAsync();
            return saved;
        }
        public async Task<User> Update(User user) {
            var saved = base.Update<User>(user);
            await base.CommitAsync();
            return saved;
        }

        public async Task<IEnumerable<User>> GetAllAsync() => await _context.User.ToListAsync();
        public async Task<User> GetByIdAsync(int id) =>
            await _context
                .User
                .Include(u => u.UserClaims)
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        public async Task<User> GetByEmailAsync(string email) => 
            await _context
                .User
                .Include(u => u.UserClaims)
                .Where(x => x.EmailAddress == email)
                .SingleOrDefaultAsync();
    }
}
