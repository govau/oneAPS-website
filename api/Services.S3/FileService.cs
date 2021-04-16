using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;


namespace Dta.OneAps.Api.Services.S3 {
    public class FileService : IFileService {
        private readonly AmazonS3Client _s3Client;
        public FileService() {
            _s3Client = new AmazonS3Client();
        }


        public void SaveFile(string path, Stream stream) {
            // var putRequest = new PutObjectRequest
            //     {
            //         BucketName = bucketName,
            //         Key = objectName,
            //         InputStream = stream,
            //         ContentType = "text/plain"
            //     };

            //     putRequest.Metadata.Add("x-amz-meta-title", "someTitle");

            //     var response = await client.PutObjectAsync(putRequest);
        }
        public Stream GetFile(string path) {
            return null;
        }
    }
}
