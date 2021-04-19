using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public class UserClaimService : DatabaseOperationService, IUserClaimService {
        private readonly OneApsContext _context;

        public UserClaimService(OneApsContext context) : base (context) {
            _context = context;
        }
        
        public async Task<UserClaim> Create(UserClaim userClaim) {
            var saved = await base.CreateAsync<UserClaim>(userClaim);
            await base.CommitAsync();
            return saved;
        }

        public async Task<UserClaim> SetClaimed(string token) {
            var existing = await _context.UserClaims.SingleOrDefaultAsync(uc => uc.ClaimToken == token);
            existing.IsClaimed = true;
            var saved = base.Update(existing);
            await base.CommitAsync();
            return saved;
        }
        public async Task<UserClaim> GetByToken(string token) =>
            await _context
                .UserClaims
                .Include(uc => uc.User)
                .SingleOrDefaultAsync(uc => uc.ClaimToken == token);
        public async Task<UserClaim> GetById(int id) =>
            await _context
                .UserClaims
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
    }
}
