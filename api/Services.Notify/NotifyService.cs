using System.Collections.Generic;
using Notify.Client;

namespace Dta.OneAps.Api.Services.Notify {
    public class NotifyService : INotifyService {
        private readonly IKeyValueService _keyValueService;

        public NotifyService(IKeyValueService keyValueService) {
            _keyValueService = keyValueService;
        }

        public async void SendEmail(string emailAddress, string templateId, Dictionary<string, dynamic> personalisation) {
            var notifyConfig = await _keyValueService.GetByKey("notify");
            string apidKey = notifyConfig.apiKey;
            var client = new NotifyClient(apidKey);

            var response = await client.SendEmailAsync(
                emailAddress,
                templateId,
                personalisation
            );
        }
    }
}
