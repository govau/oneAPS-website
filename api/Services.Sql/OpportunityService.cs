using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public class OpportunityService : DatabaseOperationService, IOpportunityService {
        private readonly OneApsContext _context;

        public OpportunityService(OneApsContext context) : base (context) {
            _context = context;
        }

        public async Task<Opportunity> Create(Opportunity opportunity) {
            var newOpportunity = await base.CreateAsync<Opportunity>(opportunity);
            await base.CommitAsync();
            return newOpportunity;
        }

        public async Task<Opportunity> Update(Opportunity opportunity) {
            var newUser = base.Update<Opportunity>(opportunity);
            await base.CommitAsync();
            return newUser;
        }

        public async Task<IEnumerable<Opportunity>> GetAllAsync() => await _context.Opportunity.ToListAsync();
        public async Task<Opportunity> GetByIdAsync(int id) => await _context.Opportunity.Where(x => x.Id == id).SingleOrDefaultAsync();
    }
}
