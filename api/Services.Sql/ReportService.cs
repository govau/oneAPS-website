using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public class ReportService : DatabaseOperationService, IReportService {
        private readonly OneApsContext _context;

        public ReportService(OneApsContext context) : base (context) {
            _context = context;
        }

        public async Task<dynamic> Get() {
            var now = DateTime.Now;
            var sevenDaysAgo = now.AddDays(-7).Date;
            var startOfMonth = now.AddDays(-now.Day).Date;
            return new {
                opportunity = new {
                    total = await _context.Opportunity.CountAsync(),
                    published = await _context.Opportunity.Where(o => o.PublishedAt != null).CountAsync(),
                },
                user = new {
                    registered = await _context.User.CountAsync(),
                    last7Days = await _context.User.Where(u => u.LoggedInAt <= sevenDaysAgo).CountAsync(),
                    fromStartOfMonth = await _context.User.Where(u => u.LoggedInAt <= startOfMonth).CountAsync()
                },
                opportunityResponse = new {
                    total = await _context.OpportunityResponse.CountAsync(),
                    applied = await _context.OpportunityResponse.Where(or => or.SubmittedAt != null).CountAsync(),
                    last7Days = await _context.OpportunityResponse.Where(or => or.SubmittedAt != null && or.SubmittedAt <= sevenDaysAgo).CountAsync(),
                    startOfMonth = await _context.OpportunityResponse.Where(or => or.SubmittedAt != null && or.SubmittedAt <= startOfMonth).CountAsync(),
                }
            };
        }
    }
}
