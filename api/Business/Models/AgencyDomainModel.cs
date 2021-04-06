namespace Dta.OneAps.Api.Business.Models {
    public class AgencyDomainModel {
        public int Id { get; set; }
        public int? AgencyId { get; set; }
        public string Domain { get; set; }
        public bool Active { get; set; }
    }
}
