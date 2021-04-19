using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Notify.Client;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Shared;
using Newtonsoft.Json;

namespace Dta.OneAps.Api.Services.Notify {
    public class NotifyService : INotifyService {
        private readonly IKeyValueService _keyValueService;
        private readonly dynamic _notifyConfig;
        private readonly dynamic _clientInfo;

        public NotifyService(IKeyValueService keyValueService) {
            _keyValueService = keyValueService;
            var notifyConfig = _keyValueService.GetByKey("notify");
            if (notifyConfig == null) {
                throw new ArgumentNullException("notifyConfig is missing");
            }
            _notifyConfig = notifyConfig;

            var clientInfo = _keyValueService.GetByKey("clientInfo");
            if (clientInfo == null) {
                throw new ArgumentNullException("clientInfo is missing");
            }
            _clientInfo = clientInfo;
        }

        private async Task SendEmail(string emailAddress, string templateId, Dictionary<string, dynamic> personalisation) {
            string apiKey = _notifyConfig.apiKey;
            var client = new NotifyClient(apiKey);

            var response = await client.SendEmailAsync(
                emailAddress,
                templateId,
                personalisation
            );
            System.Console.WriteLine(JsonConvert.SerializeObject(response.content));
        }

        public async Task SuccessfullyApplied(Opportunity opportunity, IUser user) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"opportunityName", opportunity.JobTitle},
                {"name", user.Name}
            };
            string templateId = _notifyConfig.templateIdAppliedForOpportunity;
            await SendEmail(
                user.EmailAddress,
                templateId,
                personalisation
            );
        }

        public async Task RegistrationConfirmation(IUser user, UserClaim userClaim) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"link", $"{_clientInfo.claimTokenUrl}?token={userClaim.ClaimToken}"},
                {"name", user.Name}
            };
            string templateId = _notifyConfig.templateIdRegistrationConfirmation;
            await SendEmail(
                user.EmailAddress,
                templateId,
                personalisation
            );
        }
    }
}
