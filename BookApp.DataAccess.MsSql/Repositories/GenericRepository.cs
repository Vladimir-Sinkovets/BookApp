using System.Linq.Expressions;
using BookApp.Infrastructure.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookApp.DataAccess.MsSql.Repositories
{
    public class GenericRepository<T> : IRepository<T>, IDisposable where T : class
    {
        private readonly DbContext _context;
        private readonly DbSet<T> _set;

        public GenericRepository(DbContext context)
        {
            _context = context;
            _set = _context.Set<T>();
        }

        public void Add(T entity)
        {
            _set.Add(entity);
        }

        public T? FirstOrDefault(Expression<Func<T, bool>> expression)
        {
            return GetAll()
                .FirstOrDefault(expression);
        }

        public IQueryable<T> GetAll()
        {
            return _set;
        }

        public void Remove(Expression<Func<T, bool>> expression)
        {
            var entity = _set.FirstOrDefault(expression);

            if (entity != null)
            {
                _set.Remove(entity);
            }
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
                _set.Remove(entity);
        }

        public void Update(T entity)
        {
            _set.Update(entity);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
