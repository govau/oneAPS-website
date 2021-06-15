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

If you have any questions, please contact specialist.advice@dta.gov.au.

Regards

Specialist Advice and Mobility Team
Digital Profession
specialist.advice@dta.gov.au
"},
            };
            
            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }

        public async Task ApplicationReceived(Opportunity opportunity, Lookup agency, User user) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"subject", $"You have received an application"},
                {"message", $@"
Hi {user.Name},

You have received an application for “{opportunity.JobTitle}”.

The response to the application can be viewed in your profile.

If you have any questions, please contact specialist.advice@dta.gov.au.

Regards

Specialist Advice and Mobility Team
Digital Profession
specialist.advice@dta.gov.au
"},
            };
            
            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }

        public async Task EmailVerification(IUser user, UserClaim userClaim) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"subject", "Email address confirmation"},
                {"message", $@"
Hi {user.Name},

You are now registered on OneAPS.

Before you can post or apply for opportunities, you will need to verify your email.

Login to OneAPS and type in the following code in the Verify Email screen

Your verification code is: 
#{userClaim.ClaimToken}

Regards

Specialist Advice and Mobility Team
Digital Profession
specialist.advice@dta.gov.au
"},
            };

            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }

        public async Task ResendEmailVerification(IUser user, UserClaim userClaim) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"subject", "Email address confirmation"},
                {"message", $@"
Hi {user.Name},

Login to OneAPS and type in the following code in the Verify Email screen

Your verification code is: 
#{userClaim.ClaimToken}

Regards

Specialist Advice and Mobility Team
Digital Profession
specialist.advice@dta.gov.au
"},
            };

            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }



        public async Task VerifyResetPassword(IUser user, UserClaim userClaim) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"subject", "Verify your intention to reset password"},
                {"message", $@"
Hi {user.Name},

You have requested to reset your password.

If you didn't make this request, please ignore this email, otherwise use the verification code below when resetting your password.

Your verification code is: 
#{userClaim.ClaimToken}

Regards

Specialist Advice and Mobility Team
Digital Profession
specialist.advice@dta.gov.au
"},
            };

            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }
        public async Task ResetPassword(IUser user) {
            var personalisation = new Dictionary<string, dynamic>(){
                {"subject", "Your password has been reset"},
                {"message", $@"
Hi {user.Name},

Your password was reset recently.

If you didn't make this request, please contact the digital profession team.

Regards

Specialist Advice and Mobility Team
Digital Profession
specialist.advice@dta.gov.au
"},
            };

            await SendEmail(
                user.EmailAddress,
                personalisation
            );
        }
    }
}
