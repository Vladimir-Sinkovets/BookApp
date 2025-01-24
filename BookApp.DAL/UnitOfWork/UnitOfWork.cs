using BookApp.DAL.Models;

namespace BookApp.DAL.Repositories
{
    public class UnitOfWork(ApplicationDbContext dbContext) : IUnitOfWork
    {
        private readonly IRepository<User> _userRepository;
        public IRepository<User> UsersRepository => _userRepository ?? new GenericRepository<User>(dbContext);

        public void SaveChanges() => dbContext.SaveChanges();

        public async Task SaveChangesAsync(CancellationToken cancellationToken) => await dbContext.SaveChangesAsync(cancellationToken);
    }
}
