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
