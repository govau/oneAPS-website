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
        private dynamic _notifyConfig;
        private dynamic _clientInfo;

        public NotifyService(IKeyValueService keyValueService) {
            _keyValueService = keyValueService;
        }

        private async Task<dynamic> GetClientInfo() {
            if (_clientInfo == null) {
                var clientInfo = await _keyValueService.GetByKeyAsync("clientInfo");
                if (clientInfo == null) {
                    throw new ArgumentNullException("clientInfo is missing");
                }
                _clientInfo = clientInfo;
            }
            return _clientInfo;
        }
        private async Task<dynamic> GetNotifyConfig() {
            if (_notifyConfig == null) {
                var notifyConfig = await _keyValueService.GetByKeyAsync("notify");
                if (notifyConfig == null) {
                    throw new ArgumentNullException("notifyConfig is missing");
                }
                _notifyConfig = notifyConfig;
            }
            return _notifyConfig;
        }

        private async Task SendEmail(string emailAddress, string templateId, Dictionary<string, dynamic> personalisation) {
            var notifyConfig = await GetNotifyConfig();
            string apiKey = notifyConfig.apiKey;
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
            var notifyConfig = await GetNotifyConfig();
            string templateId = notifyConfig.templateIdAppliedForOpportunity;
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
            var notifyConfig = await GetNotifyConfig();
            string templateId = notifyConfig.templateIdRegistrationConfirmation;
            await SendEmail(
                user.EmailAddress,
                templateId,
                personalisation
            );
        }
    }
}
