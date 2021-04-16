using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IKeyValueBusiness {
        Task Upsert(string key, string value); 
        Task<List<KeyValueModel>> GetByKeys(params string[] keys);
    }
}
