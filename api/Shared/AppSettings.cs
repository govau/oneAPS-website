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
        
        private string _jwtKey;
        public string JwtKey {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("JwtKey"))) {
                    _jwtKey = Environment.GetEnvironmentVariable("JwtKey");
                }
                return _jwtKey;
            }
            set {
                _jwtKey = value;
            }
        }

        private string _databaseName;
        public string DatabaseName {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("DB_NAME"))) {
                    _databaseName = Environment.GetEnvironmentVariable("DB_NAME");
                }
                return _databaseName;
            }
            set {
                _databaseName = value;
            }
        }

        private string _databaseHost;
        public string DatabaseHost {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("ENDPOINT_ADDRESS"))) {
                    _databaseHost = Environment.GetEnvironmentVariable("ENDPOINT_ADDRESS");
                }
                return _databaseHost;
            }
            set {
                _databaseHost = value;
            }
        }

        private string _databasePassword;
        public string DatabasePassword {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("MASTER_PASSWORD"))) {
                    _databasePassword = Environment.GetEnvironmentVariable("MASTER_PASSWORD");
                }
                return _databasePassword;
            }
            set {
                _databasePassword = value;
            }
        }

        private string _databasePort;
        public string DatabasePort {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("DB_PORT"))) {
                    _databasePort = Environment.GetEnvironmentVariable("DB_PORT");
                }
                return _databasePort;
            }
            set {
                _databasePort = value;
            }
        }

        private string _databaseUsername;
        public string DatabaseUsername {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("MASTER_USERNAME"))) {
                    _databaseUsername = Environment.GetEnvironmentVariable("MASTER_USERNAME");
                }
                return _databaseUsername;
            }
            set {
                _databaseUsername = value;
            }
        }
    }
}
