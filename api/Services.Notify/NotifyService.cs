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

        private async Task SendEmail(string emailAddress, Dictionary<string, dynamic> personalisation) {
            var notifyConfig = _keyValueService.GetByKey("notify");
            if (notifyConfig != null) {
                string apiKey = notifyConfig.apiKey;
                var client = new NotifyClient(apiKey);
                
                string templateId = notifyConfig.templateIdGeneric;
                var response = await client.SendEmailAsync(
                    emailAddress,
                    templateId,
                    personalisation
                );
                System.Console.WriteLine(JsonConvert.SerializeObject(response.content));
            } else {
                System.Console.WriteLine($@"
email: {emailAddress}
subject: {personalisation.GetValueOrDefault("subject")}
message: {personalisation.GetValueOrDefault("message")}
                ");
            }
        }

        public async Task SuccessfullyApplied(Opportunity opportunity, Lookup agency, IUser user) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"subject", $"You have successfully applied for {opportunity.JobTitle}"},
                {"message", $@"
Hi {user.Name},

Your application for “{opportunity.JobTitle}” has been received.

The opportunity creator will be in contact regarding the results of the opportunity.
Good luck on your application!

If you have any questions or would like to withdraw your application, please contact digitalsquads@dta.gov.au.

Regards

Digital Squads
digitalsquads@dta.gov.au
"},
            };
            
            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }

        public async Task RegistrationConfirmation(IUser user, UserClaim userClaim) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"subject", "Email address confirmation"},
                {"message", $@"
Hi {user.Name},

You’re almost ready to start using oneAPS Opportunities

Just click on the following link to confirm your email address and then you’re in!

{ClientInfo.claimTokenUrl}?token={userClaim.ClaimToken}

Regards

Digital Squads
digitalsquads@dta.gov.au
"},
            };

            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }
    }
}
