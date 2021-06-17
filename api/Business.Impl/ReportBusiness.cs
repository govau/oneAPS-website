using AutoMapper;
using Dta.OneAps.Api.Business.Exceptions;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Business.Utils;
using Dta.OneAps.Api.Services;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;
using System;
using System.Linq;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Dta.OneAps.Api.Business {
    public class ReportBusiness : IReportBusiness {
        private readonly IReportService _reportService;

        public ReportBusiness(IReportService reportService) {
            _reportService = reportService;
        }

        public async Task<dynamic> Get() {
            return await _reportService.Get();
        }
    }
}
