using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services.Sql {
    public class OpportunityService : DatabaseOperationService, IOpportunityService {
        private readonly OneApsContext _context;

        public OpportunityService(OneApsContext context) : base (context) {
            _context = context;
        }

        public async Task<Opportunity> Create(Opportunity opportunity, IUser user) {
            var newOpportunity = await base.CreateAsync<Opportunity>(opportunity, user);
            await base.CommitAsync();
            return newOpportunity;
        }

        public async Task<Opportunity> Update(Opportunity opportunity, IUser user) {
            var newObj = base.Update<Opportunity>(opportunity, user);
            await base.CommitAsync();
            return newObj;
        }

        public async Task<IEnumerable<Opportunity>> GetAll(string search, bool includeClosed) => (
            await _context
                .Opportunity
                .Include(x => x.OpportunityResponse)
                .Include(x => x.CreatedByUser)
                .Include(x => x.ModifiedByUser)
                .Include(x => x.OpportunityUser)
                .Where(x => string.IsNullOrWhiteSpace(search) ? true : x.JobTitle.ToLower().Contains(search.ToLower()))
                .Where(x => includeClosed ? true : !x.ClosedAt.HasValue)
                .OrderByDescending(x => x.Created)
                .ToListAsync()
        );
        public async Task<IEnumerable<Opportunity>> MyList(IUser user) => (
            await _context
                .Opportunity
                .Include(x => x.OpportunityResponse)
                .Include(x => x.CreatedByUser)
                .Include(x => x.ModifiedByUser)
                .Include(x => x.OpportunityUser)
                .Where(x => x.OpportunityUser.Any(ou => ou.UserId == user.Id))
                .OrderByDescending(x => x.Created)
                .ToListAsync()
        );
        public async Task<Opportunity> GetById(int id) => (
            await _context
                .Opportunity
                .Include(x => x.OpportunityResponse)
                .Include(x => x.CreatedByUser)
                .Include(x => x.ModifiedByUser)
                .Include(x => x.OpportunityUser)
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync()
        );
    }
}
