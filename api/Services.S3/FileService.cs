using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon;
using Microsoft.Extensions.Options;
using Dta.OneAps.Api.Shared;


namespace Dta.OneAps.Api.Services.S3 {
    public class FileService : IFileService {
        private readonly IOptions<AppSettings> _appSettings;
        private readonly AmazonS3Client _s3Client;
        public FileService(IOptions<AppSettings> appSettings) {
            _appSettings = appSettings;
            _s3Client = new AmazonS3Client(_appSettings.Value.S3AwsAccessKeyId, _appSettings.Value.S3AwsSecretAccessKey, new AmazonS3Config {
                RegionEndpoint = RegionEndpoint.GetBySystemName(_appSettings.Value.S3Region)
            });
        }


        public async Task SaveFile(string path, Stream stream) {
            var putRequest = new PutObjectRequest {
                BucketName = _appSettings.Value.BucketName,
                Key = path,
                InputStream = stream
            };

            putRequest.Metadata.Add("x-amz-meta-title", path);

            var response = await _s3Client.PutObjectAsync(putRequest);
        }
        public async Task<string> GetFile(string path) {
            using (var response = await _s3Client.GetObjectAsync(
                _appSettings.Value.BucketName,
                path
            ))
            using (var sr = new StreamReader(response.ResponseStream)) {
                return await sr.ReadToEndAsync();
            }
        }
    }
}
