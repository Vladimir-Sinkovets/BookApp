using BookApp.DAL.Models;

namespace BookApp.DAL.Repositories
{
    public interface IUnitOfWork
    {
        IRepository<User> UsersRepository { get; }
        void SaveChanges();
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}