using Lamar.Microsoft.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("Dta.OneAps.Api.Web.Tests")]
namespace Dta.OneAps.Api.Web {
    public class Program {
        public static void Main(string[] args) {
            var vcapServicesString = Environment.GetEnvironmentVariable("VCAP_SERVICES");
            if (!string.IsNullOrEmpty(vcapServicesString)) {
                dynamic vcapServices = JsonConvert.DeserializeObject<IDictionary<string, dynamic>>(vcapServicesString);
                foreach (JObject ups in vcapServices["user-provided"]) {
                    var credentials = JObject.FromObject(ups["credentials"]);
                    foreach (var credentialProps in credentials.Properties()) {
                        Environment.SetEnvironmentVariable(credentialProps.Name, credentialProps.Values().SingleOrDefault().Value<string>());
                    }
                }
                foreach (JObject ups in vcapServices["postgresql"]) {
                    var credentials = JObject.FromObject(ups["credentials"]);
                    foreach (var credentialProps in credentials.Properties()) {
                        if (credentialProps.Name == "PORT") {
                            Environment.SetEnvironmentVariable(string.Format("DB_PORT"), credentialProps.Values().SingleOrDefault().Value<string>());
                        } else {
                            Environment.SetEnvironmentVariable(credentialProps.Name, credentialProps.Values().SingleOrDefault().Value<string>());
                        }
                    }
                }
            }
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) {
            var builder = Host
                .CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hc, c) => {
                    c.AddEnvironmentVariables();
                    if (args != null) {
                        c.AddCommandLine(args);
                    }
                })
                .UseLamar(new SelfServiceRegistry())
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.ConfigureKestrel((c, k) => {
                        k.Limits.MinRequestBodyDataRate = null;
                        k.Limits.RequestHeadersTimeout = new TimeSpan(0, 0, 60);
                    });
                    webBuilder.CaptureStartupErrors(true);
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseSentry();

                    if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("PORT"))) {
                        webBuilder = webBuilder.UseUrls($"http://*:{Environment.GetEnvironmentVariable("PORT")}");
                    }
                });


            return builder;
        }
    }
}
