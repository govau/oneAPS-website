using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Amazon;
using Microsoft.Extensions.Options;
using Dta.OneAps.Api.Shared;


namespace Dta.OneAps.Api.Services.S3 {
    public class FileService : IFileService {
        private readonly IOptions<AppSettings> _appSettings;
        private readonly AmazonS3Client _s3Client;
        private readonly TransferUtility _transferUtility;
        public FileService(IOptions<AppSettings> appSettings) {
            _appSettings = appSettings;
            var config = new AmazonS3Config {
                RegionEndpoint = RegionEndpoint.GetBySystemName(_appSettings.Value.S3Region)
            };
            if (!string.IsNullOrWhiteSpace(_appSettings.Value.S3ServiceUrl)) {
                config.ForcePathStyle = true;
                config.ServiceURL = _appSettings.Value.S3ServiceUrl;
            }
            _s3Client = new AmazonS3Client(_appSettings.Value.S3AwsAccessKeyId, _appSettings.Value.S3AwsSecretAccessKey, config);
            _transferUtility = new TransferUtility(_s3Client);
        }

        public async Task DeleteFile(string path) {
            await _s3Client.DeleteObjectAsync(_appSettings.Value.BucketName, path);
        }

        public async Task SaveFile(string path, Stream stream) {
            await _s3Client.DeleteObjectAsync(_appSettings.Value.BucketName, path);

            var putRequest = new PutObjectRequest {
                BucketName = _appSettings.Value.BucketName,
                Key = path,
                InputStream = stream,
            };
            putRequest.Metadata.Add("x-amz-meta-title", path);
            var response = await _s3Client.PutObjectAsync(putRequest);
            System.Console.WriteLine(response.ToString());
        }

        public async Task<byte[]> GetFile(string path) {
            using (var stream = await _transferUtility.OpenStreamAsync(_appSettings.Value.BucketName, path))
            using (var ms = new MemoryStream()) {
                await stream.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}
