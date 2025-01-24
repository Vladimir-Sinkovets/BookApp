using BookApp.DAL.Models;

namespace BookApp.DAL.Repositories
{
    public class UnitOfWork(ApplicationDbContext dbContext) : IUnitOfWork
    {
        private readonly IRepository<UserEntry> _userRepository;
        public IRepository<UserEntry> UsersRepository => _userRepository ?? new GenericRepository<UserEntry>(dbContext);

        public void SaveChanges() => dbContext.SaveChanges();

        public async Task SaveChangesAsync(CancellationToken cancellationToken) => await dbContext.SaveChangesAsync(cancellationToken);
    }
}
