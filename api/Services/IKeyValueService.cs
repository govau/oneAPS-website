using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IKeyValueService {
        Task<KeyValue> Upsert(string key, dynamic data);
        Task<KeyValue> GetByKey(string key);
        Task<KeyValue> GetByKeys(params string[] keys);
    }
}
