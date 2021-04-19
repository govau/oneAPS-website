using System;

namespace Dta.OneAps.Api.Shared {
    public class AppSettings {
        private string oneApsConnectionString;
        public string OneApsConnectionString {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("OneApsConnectionString"))) {
                    oneApsConnectionString = Environment.GetEnvironmentVariable("OneApsConnectionString");
                } else if(!string.IsNullOrWhiteSpace(DatabaseEndPoint)) {
                    oneApsConnectionString = $"Host=\"{DatabaseEndPoint}\";Port=\"{DatabasePort}\";Database=\"{DatabaseName}\";Username=\"{DatabaseUsername}\";Password=\"{DatabasePassword}\"";
                }
                return oneApsConnectionString;
            }
            set {
                oneApsConnectionString = value;
            }
        }
        private string _databaseEndPoint;
        public string DatabaseEndPoint {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("ENDPOINT_ADDRESS"))) {
                    _databaseEndPoint = Environment.GetEnvironmentVariable("ENDPOINT_ADDRESS");
                }
                return _databaseEndPoint;
            }
            set {
                _databaseEndPoint = value;
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
        
        private string _jwtIssuer;
        public string JwtIssuer {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("JwtIssuer"))) {
                    _jwtIssuer = Environment.GetEnvironmentVariable("JwtIssuer");
                }
                return _jwtIssuer;
            }
            set {
                _jwtIssuer = value;
            }
        }
        
        private string _jwtAudience;
        public string JwtAudience {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("JwtAudience"))) {
                    _jwtAudience = Environment.GetEnvironmentVariable("JwtAudience");
                }
                return _jwtAudience;
            }
            set {
                _jwtAudience = value;
            }
        }

        private string _bucketName;
        public string BucketName {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("BUCKET_NAME"))) {
                    _bucketName = Environment.GetEnvironmentVariable("BUCKET_NAME");
                }
                return _bucketName;
            }
            set {
                _bucketName = value;
            }
        }

        private string _s3AwsAccessKeyId;
        public string S3AwsAccessKeyId {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("S3_AWS_ACCESS_KEY_ID"))) {
                    _s3AwsAccessKeyId = Environment.GetEnvironmentVariable("S3_AWS_ACCESS_KEY_ID");
                }
                return _s3AwsAccessKeyId;
            }
            set {
                _s3AwsAccessKeyId = value;
            }
        }

        private string _s3AwsSecretAccessKey;
        public string S3AwsSecretAccessKey {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("S3_AWS_SECRET_ACCESS_KEY"))) {
                    _s3AwsSecretAccessKey = Environment.GetEnvironmentVariable("S3_AWS_SECRET_ACCESS_KEY");
                }
                return _s3AwsSecretAccessKey;
            }
            set {
                _s3AwsSecretAccessKey = value;
            }
        }

        private string _s3Region;
        public string S3Region {
            get {
                if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("S3_REGION"))) {
                    _s3Region = Environment.GetEnvironmentVariable("S3_REGION");
                }
                return _s3Region;
            }
            set {
                _s3Region = value;
            }
        }
    }
}
