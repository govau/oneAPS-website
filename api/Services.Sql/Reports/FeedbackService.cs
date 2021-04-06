using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using Dapper;
using Dta.OneAps.Api.Services.Reports;

namespace Dta.OneAps.Api.Services.Sql.Reports {
    public class FeedbackService : IFeedbackService {
        private readonly OneApsContext _context;

        public FeedbackService(OneApsContext context) {
            _context = context;
        }
        public async Task<IEnumerable<dynamic>> GetFeedbacksAsync() {
            var connection = _context.Database.GetDbConnection();
            return await connection.QueryAsync<dynamic>(
                sql: @"
                    SELECT
                        created_at,
                        user,
                        data ->> 'objectAction' AS action,
                        data ->> 'difficultyQuestion' AS difficultyQuestion,
                        data ->> 'difficulty' AS difficulty,
                        data ->> 'allowFurtherFeedback' AS allowFurtherFeedback,
                        data ->> 'contact_for_user_research' AS contactForUserResearch,
                        data ->> 'commentQuestion' AS commentQuestion,
                        data ->> 'comment' AS comment
                    FROM audit_event
                    WHERE type = 'feedback'
                    ORDER BY id
                ");
        }        
    }
}
