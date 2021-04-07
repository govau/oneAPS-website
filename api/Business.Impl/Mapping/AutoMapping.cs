using AutoMapper;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business.Mapping {
    public class AutoMapping : Profile {
        public AutoMapping() {
            CreateMap<User, UserResponse>();
            CreateMap<UserResponse, User>();
            CreateMap<CreateUserRequest, User>();
            CreateMap<Lookup, LookupResponse>();
            CreateMap<Opportunity, OpportunityModel>();
            CreateMap<Opportunity, PublicOpportunityResponse>();
            CreateMap<OpportunityModel, Opportunity>();
        }
    }
}
