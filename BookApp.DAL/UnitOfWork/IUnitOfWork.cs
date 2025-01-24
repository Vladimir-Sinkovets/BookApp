using BookApp.DAL.Models;

namespace BookApp.DAL.Repositories
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