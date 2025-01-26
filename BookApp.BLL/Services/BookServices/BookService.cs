using BookApp.BLL.Services.Models;
using BookApp.DAL.Models;
using BookApp.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

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
            };


            if (book.TagIds != null)
                bookEntry.Tags = GetTags(book.TagIds);

            unitOfWork.BooksRepository.Add(bookEntry);

            await unitOfWork.SaveChangesAsync(new CancellationToken());
            return MapToBookData(bookEntry);
        }

        public IEnumerable<BookData> GetPaginatedBooks(int page, int itemsPerPage)
        {
            return unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .Skip(itemsPerPage * (page - 1))
                .Take(itemsPerPage)
                .Select(b => MapToBookData(b));
        }

        public BookData GetBook(int id)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .First(b => b.Id == id);

            return MapToBookData(bookEntry);
        }

        public async Task<BookData> UpdateBookAsync(BookData book)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .First(b => b.Id == book.Id);

            bookEntry.Fragment = book.Fragment;
            bookEntry.Author = book.Author;
            bookEntry.Description = book.Description;
            
            bookEntry.Tags.Clear();
            bookEntry.Tags = GetTags(book.TagIds);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return MapToBookData(bookEntry);
        }

        public async Task DeleteAsync(int id)
        {
            unitOfWork.BooksRepository.Remove(b => b.Id == id);

            await unitOfWork.SaveChangesAsync(new CancellationToken());
        }

        private static BookData MapToBookData(BookEntry bookEntry)
        {
            return new BookData()
            {
                Id = bookEntry.Id,
                Title = bookEntry.Title,
                Description = bookEntry.Description,
                Author = bookEntry.Author,
                Fragment = bookEntry.Fragment,
                TagIds = bookEntry.Tags?.Select(bookEntry => bookEntry.Id).ToList()
            };
        }

        private List<TagEntry> GetTags(List<int> tagIds)
        {
            var tags = new List<TagEntry>();

            foreach (int id in tagIds)
            {
                var tag = unitOfWork.TagsRepository.FirstOrDefault(t => t.Id == id);

                if (tag != null)
                    tags.Add(tag);
            }

            return tags;
        }
    }
}
