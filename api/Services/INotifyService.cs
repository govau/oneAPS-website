using System.Collections.Generic;
using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface INotifyService {
        void SendEmail(string emailAddress, string templateId, Dictionary<string, dynamic> personalisation);
    }
}
