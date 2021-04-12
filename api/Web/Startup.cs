using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Dta.OneAps.Api.Shared;
using Dta.OneAps.Api.Services.Sql;
using Dta.OneAps.Api.Business.Mapping;
using Dta.OneAps.Api.Business.Validators;
using System;
using System.Text;

namespace Dta.OneAps.Api.Web {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }
        // private readonly string _devOrigins = "_devOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            // services.AddCors(options => {
            //     options.AddPolicy(_devOrigins, builder => {
            //         builder.WithOrigins("http://localhost:8000")
            //             .AllowAnyHeader()
            //             .AllowAnyMethod();
            //     });
            // });
            services
                .AddControllers()
                .AddFluentValidation(fv => {
                    fv.RegisterValidatorsFromAssemblyContaining<CreateUserModelValidator>();
                });

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();

            var connectionString = string.Empty;
            if (appSettings == null || string.IsNullOrEmpty(appSettings.OneApsConnectionString)) {
                var host = Environment.GetEnvironmentVariable("ENDPOINT_ADDRESS");
                var port = Environment.GetEnvironmentVariable("DB_PORT");
                var name = Environment.GetEnvironmentVariable("DB_NAME");
                var username = Environment.GetEnvironmentVariable("MASTER_USERNAME");
                var password = Environment.GetEnvironmentVariable("MASTER_PASSWORD");
                connectionString = $"Host={host};Port={port};Database={name};Username={username};Password={password}";
            } else {
                connectionString = appSettings.OneApsConnectionString;
            }
            var jwtKey = Environment.GetEnvironmentVariable("JwtKey");
            if (string.IsNullOrEmpty(jwtKey)) {
                jwtKey = appSettings.JwtKey;
            }
            
            // appSettings.OneApsConnectionString = appSettings.OneApsConnectionString;
            // appSettings.JwtKey = Environment.GetEnvironmentVariable("JwtKey");

            services
                .AddAuthentication(options => {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        // ValidIssuer = Configuration["Jwt:Issuer"],    
                        // ValidAudience = Configuration["Jwt:Issuer"],    
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
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
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {securityScheme, new string[] { }}
                });
            });

            services
                .AddEntityFrameworkNpgsql()
                .AddDbContext<OneApsContext>(options => {
                    options.UseNpgsql(connectionString);
                });

            services.AddAutoMapper(typeof(AutoMapping));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseRouting();

            // global cors policy
            // app.UseCors(x => x
            //     .AllowAnyOrigin()
            //     .AllowAnyMethod()
            //     .AllowAnyHeader());

            // app.UseCors(_devOrigins);


            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("./swagger/v1/swagger.json", "OneAPS Api V1");
                c.DocumentTitle = "OneAPS Api";
                c.RoutePrefix = string.Empty;
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
