using BookApp.BLL.Exceptions;
using BookApp.BLL.Models;
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

            unitOfWork.BooksRepository.Add(bookEntry);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            if (book.Tags != null)
                bookEntry.Tags = await GetTagsAsync(book.Tags);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return MapToBookData(bookEntry);
        }

        public PaginatedData<BookData> GetPaginatedBooks(int page, int itemsPerPage)
        {
            var booksCount = unitOfWork.BooksRepository.GetAll().Count();

            var books = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .Skip(itemsPerPage * (page - 1))
                .Take(itemsPerPage)
                .Select(b => MapToBookData(b));

            return new PaginatedData<BookData>
            {
                Items = books,
                LastPage = (int)Math.Ceiling(booksCount / (decimal)itemsPerPage),
            };
        }

        public BookData GetBook(int id)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .FirstOrDefault(b => b.Id == id);

            if (bookEntry == null)
                throw new NotFoundException();

            return MapToBookData(bookEntry);
        }

        public async Task<BookData> UpdateBookAsync(BookData book)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .First(b => b.Id == book.Id);

            if (bookEntry == null)
                throw new NotFoundException();

            bookEntry.Title = book.Title;
            bookEntry.Fragment = book.Fragment;
            bookEntry.Author = book.Author;
            bookEntry.Description = book.Description;
            
            bookEntry.Tags.Clear();
            bookEntry.Tags = await GetTagsAsync(book.Tags);

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
                Tags = bookEntry.Tags?.Select(bookEntry => bookEntry.Name).ToList()
            };
        }

        private async Task<List<TagEntry>> GetTagsAsync(List<string> tags)
        {
            return await unitOfWork.TagsRepository.GetAll()
                .Where(t => tags.Contains(t.Name))
                .ToListAsync();
        }
    }
}
