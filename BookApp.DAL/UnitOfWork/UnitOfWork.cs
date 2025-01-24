using BookApp.DAL.Models;

namespace BookApp.DAL.Repositories
{
    public class UnitOfWork(ApplicationDbContext dbContext) : IUnitOfWork
    {
        private readonly IRepository<UserEntry> _userRepository;
        private readonly IRepository<BookEntry> _booksRepository;
        private readonly IRepository<TagEntry> _tagsRepository;

        public IRepository<UserEntry> UsersRepository => _userRepository ?? new GenericRepository<UserEntry>(dbContext);
        public IRepository<BookEntry> BooksRepository => _booksRepository ?? new GenericRepository<BookEntry>(dbContext);
        public IRepository<TagEntry> TagsRepository => _tagsRepository ?? new GenericRepository<TagEntry>(dbContext);

        public void SaveChanges() => dbContext.SaveChanges();

        public async Task SaveChangesAsync(CancellationToken cancellationToken) => await dbContext.SaveChangesAsync(cancellationToken);
    }
}
