using System;

namespace Dta.OneAps.Api.Business.Exceptions {
    public class ValidationErrorException : Exception {
        public ValidationErrorException() : base("Validation error") { }
        public ValidationErrorException(string message) : base(message) { }
    }
}
