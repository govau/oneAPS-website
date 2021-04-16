using System;

namespace Dta.OneAps.Api.Business.Exceptions {
    public class UnauthorisedException : Exception {
        public UnauthorisedException() : base("Unauthorised to perform this actions") { }
    }
}
