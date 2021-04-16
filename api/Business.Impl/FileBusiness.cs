using AutoMapper;
using System;
using System.IO;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public class FileBusiness : IFileBusiness {
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public FileBusiness(IFileService fileService, IMapper mapper) {
            _fileService = fileService;
            _mapper = mapper;
        }

        public async Task SaveFile(string path, Stream stream) {
            await _fileService.SaveFile(path, stream);
        }
        public async Task<string> GetFile(string path) {
            return await _fileService.GetFile(path);
        }

    }
}
