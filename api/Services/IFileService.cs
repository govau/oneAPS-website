using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Services {
    public interface IFileService {
        Task DeleteFile(string path);
        Task SaveFile(string path, Stream stream);
        Task<byte[]> GetFile(string path);
    }
}
