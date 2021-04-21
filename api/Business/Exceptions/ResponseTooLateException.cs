using System;

namespace Dta.OneAps.Api.Business.Exceptions {
    public class ResponseTooLateException : Exception {
        public ResponseTooLateException() : base("The opportunity has already closed") { }
    }
}
