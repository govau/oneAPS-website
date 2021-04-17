using System.Threading.Tasks;
using Dta.OneAps.Api.Shared;

namespace Dta.OneAps.Api.Services {
    public interface IDatabaseOperationService {
        Task<T> CreateAsync<T>(T entity) where T: class;
        Task<T> CreateAsync<T>(T entity, IUser user) where T: class;
        T Update<T>(T entity, IUser user) where T: class;
        Task<int> CommitAsync();
    }
}
