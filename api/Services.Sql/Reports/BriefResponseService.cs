using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using Dapper;
using Dta.OneAps.Api.Services.Reports;

namespace Dta.OneAps.Api.Services.Sql.Reports {
    public class OpportunityResponseService : IOpportunityResponseService {
        private readonly OneApsContext _context;

        public OpportunityResponseService(OneApsContext context) {
            _context = context;
        }
        public async Task<IEnumerable<dynamic>> GetSubmittedOpportunityResponsesAsync() {
            var connection = _context.Database.GetDbConnection();
            return await connection.QueryAsync<dynamic>(
                sql: @"
                    SELECT
                        br.opportunity_id,
                        br.supplier_code,
                        br.created_at,
                        br.data ->> 'dayRate' AS day_rate,
                        l.name as opportunity_type,
                        br.data ->> 'areaOfExpertise' AS opportunity_category
                    FROM opportunity_response br	
                    INNER JOIN opportunity b ON b.id = br.opportunity_id
                    INNER JOIN lot l  ON l.id = br.opportunity_id
                    WHERE br.withdrawn_at IS NULL
                    AND br.submitted_at IS NOT NULL
                    ORDER BY b.id
                ");
        }
    }
}
