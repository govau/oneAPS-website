using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IUserClaimService {
        Task<UserClaim> Create(UserClaim user);
        Task<UserClaim> GetById(int id);
        Task<UserClaim> GetByToken(string token);
        Task<UserClaim> SetClaimed(string token);
        Task<UserClaim> Update(UserClaim userClaim);
    }
}
