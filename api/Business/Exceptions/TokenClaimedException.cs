using System;

namespace Dta.OneAps.Api.Business.Exceptions {
    public class TokenClaimedException : Exception {
        public TokenClaimedException() : base("Token already claimed") { }
    }
}
