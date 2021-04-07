using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services;

namespace Dta.OneAps.Api.Services.Sql {
    public class DatabaseOperationService : IDatabaseOperationService {
        private readonly OneApsContext _context;

        public DatabaseOperationService(OneApsContext context) {
            _context = context;
        }

        public async Task<T> CreateAsync<T>(T entity) where T : class {
            var result = await _context.AddAsync<T>(entity);
            return result.Entity;
        }

        public T Update<T>(T entity) where T : class {
            var result =  _context.Update<T>(entity);
            return result.Entity;
        }
        
        public async Task<int> CommitAsync() {
            return await _context.SaveChangesAsync();
        }
    }
}
