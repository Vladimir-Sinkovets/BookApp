using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Books.Queries.GetPaginatedBooks
{
    public class GetPaginatedBookQueryHandler(
        IUnitOfWork unitOfWork,
        ILogger<GetPaginatedBookQueryHandler> logger) : IRequestHandler<GetPaginatedBookQuery, Result<GetpaginatedBookQueryResponse>>
    {
        public async Task<Result<GetpaginatedBookQueryResponse>> Handle(GetPaginatedBookQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Request books");

            var booksCount = unitOfWork.BooksRepository.GetAll().Count();

            var books = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .Skip(request.ItemsPerPage * (request.Page - 1))
                .Take(request.ItemsPerPage)
                .Select(b => new BookDataResponse()
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    Tags = b.Tags.Select(bookEntry => bookEntry.Name).ToList()
                });

            logger.LogInformation("List of books obtained from the database");

            return Result<GetpaginatedBookQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    Books = books,
                    LastPage = (int)Math.Ceiling(booksCount / (decimal)request.ItemsPerPage),
                });
        }
    }
}
