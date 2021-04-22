using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Dta.OneAps.Api.Business.Exceptions;

namespace Dta.OneAps.Api.Web.Filters {
    public class CustomExceptionAttribute : Attribute, IExceptionFilter {

        public void OnException(ExceptionContext context) {
            if (context.Exception is UnauthorizedAccessException) {
                context.Result = new ForbidResult();
            } else if (context.Exception is NotFoundException) {
                context.Result = new NotFoundResult();
            } else if (context.Exception is TokenClaimedException) {
                context.Result = new ConflictResult();
            } else if (context.Exception is ResponseTooLateException) {
                context.Result = new BadRequestResult();
            }
        }
    }
}