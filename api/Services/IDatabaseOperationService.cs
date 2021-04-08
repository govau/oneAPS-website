using System.Threading.Tasks;
using Dta.OneAps.Api.Services.Entities;

namespace Dta.OneAps.Api.Services {
    public interface IDatabaseOperationService {
        Task<T> CreateAsync<T>(T entity) where T: class;
        Task<T> CreateAsync<T>(T entity, User creatorUser) where T: class;
        T Update<T>(T entity, User modiferUser) where T: class;
        Task<int> CommitAsync();
    }
}
