using BookApp.BLL.Services.Models;
using BookApp.DAL.Models;
using BookApp.DAL.Repositories;

namespace BookApp.BLL.Services.BookServices
{
    public class BookService(IUnitOfWork unitOfWork) : IBookService
    {
        public async Task<BookData> AddBookAsync(BookData book)
        {
            var bookEntry = new BookEntry()
            {
                Description = book.Description,
                Author = book.Author,
                Fragment = book.Fragment,
                Id = book.Id,
                Title = book.Title,
                Tags = new List<TagEntry>(),
            };

            foreach (int id in book.TagIds)
            {
                var tag = unitOfWork.TagsRepository.FirstOrDefault(t => t.Id == id);
                if (tag != null)
                    bookEntry.Tags.Add(tag);
            }

            unitOfWork.BooksRepository.Add(bookEntry);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return book;
        }
    }
}
