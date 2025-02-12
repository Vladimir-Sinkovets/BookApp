using System.Linq.Expressions;

namespace BookApp.Infrastructure.Interfaces.Repositories
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        T? FirstOrDefault(Expression<Func<T, bool>> expression);
        IQueryable<T> GetAll();
        void Remove(Expression<Func<T, bool>> expression);
        void RemoveRange(IEnumerable<T> entities);
        void Update(T entity);
    }
}
