using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services.Sql {
    public class KeyValueService : DatabaseOperationService, IKeyValueService {
        private readonly OneApsContext _context;

        public KeyValueService(OneApsContext context) : base (context) {
            _context = context;
        }

        public async Task<KeyValue> Upsert(string key, string data) {
            var existing = await _context.KeyValue.SingleOrDefaultAsync(kv => kv.Key == key);
            KeyValue updated;
            if (existing == null) {
                updated = await base.CreateAsync<KeyValue>(new KeyValue {
                    Key = key,
                    Data = data,
                    UpdatedAt = DateTime.UtcNow
                });
            } else {
                existing.Data = data;
                existing.UpdatedAt = DateTime.UtcNow;
                updated = base.Update<KeyValue>(existing);
            }
            await base.CommitAsync();
            return updated;
        }
        public async Task<dynamic> GetByKeyAsync(string key) {
            var keyValue = await _context
                .KeyValue
                .Where(kv => kv.Key == key)
                .SingleOrDefaultAsync();
            
            if (keyValue == null) {
                return null;
            }
            return JsonConvert.DeserializeObject<dynamic>(keyValue.Data);
        }
        public dynamic GetByKey(string key) {
            var keyValue = _context
                .KeyValue
                .Where(kv => kv.Key == key)
                .SingleOrDefault();
            
            if (keyValue == null) {
                return null;
            }
            return JsonConvert.DeserializeObject<dynamic>(keyValue.Data);
        }
        public async Task<IDictionary<string, dynamic>> GetByKeys(params string[] keys) {
            var keyValues = await _context
                .KeyValue
                .Where(kv => keys.Contains(kv.Key))
                .ToListAsync();

            var result = new Dictionary<string, dynamic>();
            foreach(var keyValue in keyValues) {
                result.Add(keyValue.Key, JsonConvert.DeserializeObject<dynamic>(keyValue.Data));
            }
            return result;
        }
    }
}
