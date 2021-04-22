using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Services.Sql;
using Dta.OneAps.Api.Business.Mapping;
using Dta.OneAps.Api.Business.Validators;
using Dta.OneAps.Api.Web.Filters;
using System;
using System.Text;

namespace Dta.OneAps.Api.Web {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services
                .AddControllers(o => {
                    o.Filters.Add(typeof(CustomExceptionAttribute));
                })
                .AddFluentValidation(fv => {
                    fv.RegisterValidatorsFromAssemblyContaining<CreateUserModelValidator>();
                });

            // configure strongly typed settings objects
            var appSettings = Configuration.Get<AppSettings>();

            services
                .AddAuthentication(options => {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(_ => {
                    _.RequireHttpsMetadata = true;
                    _.SaveToken = true;
                    _.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuer = true,
                        ValidIssuer = appSettings.JwtIssuer,
                        ValidateAudience = true,
                        ValidAudience = appSettings.JwtAudience,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.JwtKey)),
                        ClockSkew = TimeSpan.FromMinutes(1)
                    };
                });

            // .AddScheme<AuthenticationSchemeOptions, UserAuthenticationHandler>(Schemes.UserAuthenticationHandler, null)
            // .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>(Schemes.ApiKeyAuthenticationHandler, null);


            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "OneAPS Api", Version = "v1" });

                var securityScheme = new OpenApiSecurityScheme {
                    Name = "JWT Authentication",
                    Description = "Enter JWT Bearer token **_only_**",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer", // must be lower case
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {securityScheme, new string[] { }}
                });
            });

            services
                .AddEntityFrameworkNpgsql()
                .AddDbContext<OneApsContext>(options => {
                    options.UseNpgsql(appSettings.OneApsConnectionString);
                });

            services.AddAutoMapper(typeof(AutoMapping));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseRouting();

            app.UseSwagger(c => {
                c.RouteTemplate = "api/swagger/{documentname}/swagger.json";
            });
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("swagger/v1/swagger.json", "OneAPS Api V1");
                c.DocumentTitle = "OneAPS Api";
                c.RoutePrefix = "api";
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
