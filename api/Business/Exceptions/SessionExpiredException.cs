using System;

namespace Dta.OneAps.Api.Business.Exceptions {
    public class SessionExpiredException: Exception {
        public SessionExpiredException() : base("Session has expired") { }
    }
}
