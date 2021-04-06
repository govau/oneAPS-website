using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using Dapper;
using Dta.OneAps.Api.Services.Reports;

namespace Dta.OneAps.Api.Services.Sql.Reports {
    public class BriefService : IBriefService {
        private readonly OneApsContext _context;

        public BriefService(OneApsContext context) {
            _context = context;
        }
        public async Task<IEnumerable<dynamic>> GetPublishedBriefsAsync() {
            var connection = _context.Database.GetDbConnection();
            return await connection.QueryAsync<dynamic>(
                sql: @"
                    SELECT
                        b.id,
                        b.data ->> 'organisation' AS organisation,
                        b.published_at,
                        b.withdrawn_at,
                        b.data ->> 'title' AS title,
                        b.data ->> 'sellerSelector' AS openTo,
                        b.data ->> 'areaOfExpertise' AS brief_category,
                        l.name AS brief_type,
                        r.domain AS publisher_domain
                    FROM brief b
                    INNER JOIN lot l ON l.id = b.id
                    INNER JOIN(
                        SELECT
                            tb.brief_id,
                            array_agg(SUBSTRING(u.email_address, '@(.*)')) AS domain
                        FROM team_brief tb
                        INNER JOIN team t ON t.id = tb.team_id
                        INNER JOIN ""user"" u ON u.id = tb.user_id
                        WHERE t.status = 'completed'
                        GROUP BY tb.brief_id, u.email_address
                        UNION
                        SELECT
                            bu.brief_id,
                            array_agg(SUBSTRING(u.email_address, '@(.*)')) AS domain
                        FROM brief_user bu
                        INNER JOIN ""user"" u ON u.id = bu.user_id
                        GROUP BY bu.brief_id, u.email_address
                        ) r on r.brief_id = b.id
                    WHERE b.published_at IS NOT NULL
                    ORDER BY b.id
                ");
        }
    }
}
