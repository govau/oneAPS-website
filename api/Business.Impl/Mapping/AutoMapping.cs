using AutoMapper;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Business.Models;

namespace Dta.OneAps.Api.Business.Mapping {
    public class AutoMapping : Profile {
        public AutoMapping() {
            CreateMap<User, UserResponse>();
            CreateMap<Lookup, LookupResponse>();
            CreateMap<Opportunity, OpportunityResponse>();
            CreateMap<Opportunity, OpportunityPublicResponse>();


            CreateMap<CreateUserRequest, User>();
            CreateMap<OpportunitySaveRequest, Opportunity>();
        }
    }
}
