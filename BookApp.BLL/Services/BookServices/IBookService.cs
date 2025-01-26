using BookApp.BLL.Services.Models;

namespace BookApp.BLL.Services.BookServices
{
    public interface IBookService
    {
        Task<BookData> AddBookAsync(BookData book);
        Task DeleteAsync(int id);
        BookData GetBook(int id);
        IEnumerable<BookData> GetPaginatedBooks(int page, int itemsPerPage);
        Task<BookData> UpdateBookAsync(BookData book);
    }
}