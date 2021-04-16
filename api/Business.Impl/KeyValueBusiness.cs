using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Dta.OneAps.Api.Business {
    public class KeyValueBusiness : IKeyValueBusiness {
        private readonly IKeyValueService _keyValueService;
        private readonly IMapper _mapper;

        public KeyValueBusiness(IKeyValueService keyValueService, IMapper mapper) {
            _keyValueService = keyValueService;
            _mapper = mapper;
        }

        public async Task Upsert(string key, string value) {
            var keyValue = await _keyValueService.Upsert(key, value);
        }

        public async Task<List<KeyValueModel>> GetByKeys(params string[] keys) {
            return _mapper.Map<List<KeyValueModel>>(await _keyValueService.GetByKeys(keys));
        }
    }
}
