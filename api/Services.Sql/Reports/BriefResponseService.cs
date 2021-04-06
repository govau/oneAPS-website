using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using Dapper;
using Dta.OneAps.Api.Services.Reports;

namespace Dta.OneAps.Api.Services.Sql.Reports {
    public class BriefResponseService : IBriefResponseService {
        private readonly OneApsContext _context;

        public BriefResponseService(OneApsContext context) {
            _context = context;
        }
        public async Task<IEnumerable<dynamic>> GetSubmittedBriefResponsesAsync() {
            var connection = _context.Database.GetDbConnection();
            return await connection.QueryAsync<dynamic>(
                sql: @"
                    SELECT
                        br.brief_id,
                        br.supplier_code,
                        br.created_at,
                        br.data ->> 'dayRate' AS day_rate,
                        l.name as brief_type,
                        br.data ->> 'areaOfExpertise' AS brief_category
                    FROM brief_response br	
                    INNER JOIN brief b ON b.id = br.brief_id
                    INNER JOIN lot l  ON l.id = br.brief_id
                    WHERE br.withdrawn_at IS NULL
                    AND br.submitted_at IS NOT NULL
                    ORDER BY b.id
                ");
        }
    }
}
