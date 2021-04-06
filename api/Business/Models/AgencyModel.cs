using System.Collections.Generic;

namespace Dta.OneAps.Api.Business.Models {
    public class AgencyModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string Category { get; set; }
        public string State { get; set; }
        public bool? Whitelisted { get; set; }
        public bool Reports { get; set; }
        public virtual ICollection<AgencyDomainModel> AgencyDomain { get; set; }
    }
}
