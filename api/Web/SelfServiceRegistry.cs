using Lamar;

namespace Dta.OneAps.Api.Web {
    public class SelfServiceRegistry: ServiceRegistry {
        public SelfServiceRegistry() {
            Scan(x => {
                x.AssembliesFromApplicationBaseDirectory(af => af.GetName().Name.StartsWith("Dta.OneAps.Api"));
                x.WithDefaultConventions();
            });
        }
    }
}
