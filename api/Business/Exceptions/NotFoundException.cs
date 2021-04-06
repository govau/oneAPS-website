using System;

namespace Dta.OneAps.Api.Business.Exceptions {
    public class NotFoundException: Exception {
        public NotFoundException() : base("Cannot find") { }
    }
}
