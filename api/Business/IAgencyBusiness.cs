using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public interface IAgencyBusiness {
        Task<IEnumerable<AgencyModel>> GetAgenciesAsync();
        Task<AgencyModel> GetAgencyAsync(int id);
        Task<bool> UpdateAsync(int id, dynamic agency, string updatedBy);
    }
}
