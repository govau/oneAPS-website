using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services.Sql {
    public class OpportunityResponseService : DatabaseOperationService, IOpportunityResponseService {
        private readonly OneApsContext _context;

        public OpportunityResponseService(OneApsContext context) : base (context) {
            _context = context;
        }

        public async Task<OpportunityResponse> Create(OpportunityResponse opportunity, IUser user) {
            var newObj = await base.CreateAsync<OpportunityResponse>(opportunity, user);
            newObj.CreatedAt = DateTime.UtcNow;
            newObj.UserId = user.Id;
            newObj.UpdatedAt = DateTime.UtcNow;
            newObj.Data = "{}";
            await base.CommitAsync();
            return newObj;
        }

        public async Task<OpportunityResponse> Update(OpportunityResponse opportunity, IUser user) {
            var saved = base.Update<OpportunityResponse>(opportunity, user);
            saved.UpdatedAt = DateTime.UtcNow;
            await base.CommitAsync();
            return saved;
        }

        public async Task<OpportunityResponse> Get(int opportunityId, int userId) => (
            await _context.OpportunityResponse
                .Where(or => or.OpportunityId == opportunityId)
                .Where(or => or.UserId == userId)
                .SingleOrDefaultAsync()
        );

        public async Task<OpportunityResponse> GetById(int id) => (
            await _context
                .OpportunityResponse
                .Include(x => x.User)
                .Include(x => x.Opportunity)
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync()
        );
        public async Task<IEnumerable<OpportunityResponse>> MyList(IUser user) => (
            await _context
                .OpportunityResponse
                .Include(or => or.Opportunity)
                .Where(or => or.UserId == user.Id)
                .ToListAsync()
        );
    }
}
