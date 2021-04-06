using System;

namespace Dta.OneAps.Api.Business.Exceptions {
    public class CannotAuthenticateException : Exception {
        public CannotAuthenticateException() : base("Unable to login using the supplied details") { }
    }
}
