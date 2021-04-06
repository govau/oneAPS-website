using AutoMapper;
using System.Collections.Generic;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business {
    public class LookupBusiness : ILookupBusiness {
        private readonly ILookupService _lookupService;
        private readonly IMapper _mapper;

        public LookupBusiness(ILookupService lookupService, IMapper mapper) {
            _lookupService = lookupService;
            _mapper = mapper;
        }

        public IEnumerable<LookupModel> Get(string name) => _mapper.Map<List<LookupModel>>(_lookupService.Get(name));
    }
}
