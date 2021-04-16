using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IKeyValueService {
        Task<KeyValue> Upsert(string key, string data);
        Task<dynamic> GetByKey(string key);
        Task<IDictionary<string, dynamic>> GetByKeys(params string[] keys);
    }
}
