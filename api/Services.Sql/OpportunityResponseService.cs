using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public class OpportunityResponseService : DatabaseOperationService, IOpportunityResponseService {
        private readonly OneApsContext _context;

        public OpportunityResponseService(OneApsContext context) : base (context) {
            _context = context;
        }

        public async Task<OpportunityResponse> Create(OpportunityResponse opportunity, User creatorUser) {
            var newObj = await base.CreateAsync<OpportunityResponse>(opportunity, creatorUser);
            newObj.CreatedAt = DateTime.UtcNow;
            newObj.UserId = creatorUser.Id;
            newObj.UpdatedAt = DateTime.UtcNow;
            newObj.Data = "{}";
            await base.CommitAsync();
            return newObj;
        }

        public async Task<OpportunityResponse> Update(OpportunityResponse opportunity, User modiferUser) {
            var saved = base.Update<OpportunityResponse>(opportunity, modiferUser);
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
        public async Task<IEnumerable<OpportunityResponse>> ListByOpportunityId(int opportunityId) => (
            await _context.OpportunityResponse.Where(or => or.OpportunityId == opportunityId).ToListAsync()
        );

        public async Task<OpportunityResponse> GetById(int id) => (
            await _context
                .OpportunityResponse
                .Include(x => x.User)
                .Include(x => x.Opportunity)
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync()
        );
    }
}
