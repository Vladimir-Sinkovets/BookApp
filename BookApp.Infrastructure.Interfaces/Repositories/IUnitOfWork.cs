using BookApp.Entities.Models;

namespace BookApp.Infrastructure.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        IRepository<UserEntry> UsersRepository { get; }
        IRepository<BookEntry> BooksRepository { get; }
        IRepository<TagEntry> TagsRepository { get; }
        void SaveChanges();
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}