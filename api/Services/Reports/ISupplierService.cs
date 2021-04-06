using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Services.Reports {
    public interface ISupplierService {
        Task<IEnumerable<dynamic>> GetSuppliersAsync();
    }
}
