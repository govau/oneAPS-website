using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Business.Models;
using System.IO;

namespace Dta.OneAps.Api.Business {
    public interface IFileBusiness {
        Task DeleteFile(string path);
        Task SaveFile(string path, Stream stream);
        Task<byte[]> GetFile(string path);
    }
}
