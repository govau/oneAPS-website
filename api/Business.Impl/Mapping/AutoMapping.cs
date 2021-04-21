using AutoMapper;
using Dta.OneAps.Api.Services.Entities;
using Dta.OneAps.Api.Business.Models;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Business.Mapping {
    public class AutoMapping : Profile {
        public AutoMapping() {
            CreateMap<User, UserResponse>();
            CreateMap<User, IUser>();
            CreateMap<Lookup, LookupResponse>();
            // CreateMap<Opportunity, OpportunityResponse>();
            CreateMap<Opportunity, OpportunityPublicResponse>();
            CreateMap<Opportunity, OpportunityAdminResponse>();
            CreateMap<Opportunity, OpportunityAuthResponse>();
            CreateMap<OpportunityResponse, OpportunityResponseSaveResponse>();
            CreateMap<OpportunityResponse, OpportunityResponsePublicResponse>();
            CreateMap<OpportunityResponse, OpportunityResponsePrivateResponse>();
            
            CreateMap<UserCreateRequest, User>();
            CreateMap<OpportunitySaveRequest, Opportunity>();
            CreateMap<OpportunityResponseSaveRequest, OpportunityResponse>();
            CreateMap<OpportunityResponseApplyRequest, OpportunityResponse>();
        }
    }
}
