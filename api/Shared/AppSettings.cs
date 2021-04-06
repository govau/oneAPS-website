using System;

namespace Dta.OneAps.Api.Shared {
    public class AppSettings {
        private string oneApsConnectionString;
        public string OneApsConnectionString {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("OneApsConnectionString"))) {
                    oneApsConnectionString = Environment.GetEnvironmentVariable("OneApsConnectionString");
                }
                return oneApsConnectionString;
            }
            set {
                oneApsConnectionString = value;
            }
        }
        
        private string _salt;
        public string Salt {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("Salt"))) {
                    _salt = Environment.GetEnvironmentVariable("Salt");
                }
                return _salt;
            }
            set {
                _salt = value;
            }
        }
    }
}
