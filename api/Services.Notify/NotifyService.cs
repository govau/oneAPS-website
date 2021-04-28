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

        private dynamic ClientInfo {
            get {
                if (_clientInfo == null) {
                    _clientInfo = _keyValueService.GetByKey("clientInfo");
                    if (_clientInfo == null) {
                        throw new ArgumentNullException("clientInfo is missing");
                    }
                }
                return _clientInfo;
            }
        }
        private dynamic NotifyConfig {
            get {
                if (_notifyConfig == null) {
                    _notifyConfig = _keyValueService.GetByKey("notify");
                    if (_notifyConfig == null) {
                        throw new ArgumentNullException("notifyConfig is missing");
                    }
                }

                return _notifyConfig;
            }
        }

        private async Task SendEmail(string emailAddress, string templateId, Dictionary<string, dynamic> personalisation) {
            string apiKey = NotifyConfig.apiKey;
            var client = new NotifyClient(apiKey);

            var response = await client.SendEmailAsync(
                emailAddress,
                templateId,
                personalisation
            );
            System.Console.WriteLine(JsonConvert.SerializeObject(response.content));
        }

        public async Task SuccessfullyApplied(Opportunity opportunity, Lookup agency, IUser user) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"opportunityName", opportunity.JobTitle},
                {"agencyName", agency.Text},
                {"name", user.Name}
            };
            string templateId = NotifyConfig.templateIdAppliedForOpportunity;
            await SendEmail(
                user.EmailAddress,
                templateId,
                personalisation
            );
        }

        public async Task RegistrationConfirmation(IUser user, UserClaim userClaim) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"link", $"{ClientInfo.claimTokenUrl}?token={userClaim.ClaimToken}"},
                {"name", user.Name}
            };
            string templateId = NotifyConfig.templateIdRegistrationConfirmation;
            await SendEmail(
                user.EmailAddress,
                templateId,
                personalisation
            );
        }
    }
}
