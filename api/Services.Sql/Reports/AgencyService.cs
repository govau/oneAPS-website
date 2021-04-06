using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using Dapper;

namespace Dta.OneAps.Api.Services.Sql.Reports {
    public class AgencyService : Dta.OneAps.Api.Services.Reports.IAgencyService {
        private readonly OneApsContext _context;
        public AgencyService(OneApsContext context) {
            _context = context;
        }
        public async Task<IEnumerable<dynamic>> GetAgenciesAsync() {
            var connection = _context.Database.GetDbConnection();
            return await connection.QueryAsync<dynamic, dynamic, dynamic>(
                sql: @"
                    SELECT
                        a.id,
                        a.name,
                        a.domain,
                        a.category,
                        a.state,
                        a.body_type ""bodyType"",
                        a.whitelisted,
                        a.reports,
                        r.domains
                    FROM agency a
                    INNER JOIN (
                        SELECT
                            agency_id,
                            json_agg(
                                json_build_object(
                                    'id', id,
                                    'domain', domain,
                                    'active', active
                                )
                            ) ""domains""
                        FROM agency_domain ad
                        GROUP BY ad.agency_id
                    ) r on r.agency_id = a.id
                    ORDER BY a.name
                ",
                map: (a, ad) => {
                    a.domains = JsonSerializer.Deserialize<dynamic>(ad.domains);
                    return a;
                }, 
                splitOn: "domains");
        }
    }
}
