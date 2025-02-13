using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Books.Queries.GetBook
{
    public class GetBookQueryHandler(
        IUnitOfWork unitOfWork,
        ILogger<GetBookQueryHandler> logger) : IRequestHandler<GetBookQuery, Result<GetBookQueryResponse>>
    {
        public async Task<Result<GetBookQueryResponse>> Handle(GetBookQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Request a book by id: {id}", request.Id);

            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .FirstOrDefault(b => b.Id == request.Id);

            if (bookEntry == null)
            {
                logger.LogInformation("Book not found with id: {id}", request.Id);

                return Result<GetBookQueryResponse>.Create(Status.NotFound, "Book not found");
            }

            logger.LogInformation("Return book with id: {id}", request.Id);

            return Result<GetBookQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    Id = bookEntry.Id,
                    Title = bookEntry.Title,
                    Description = bookEntry.Description,
                    Author = bookEntry.Author,
                    Fragment = bookEntry.Fragment,
                    Tags = bookEntry.Tags?.Select(bookEntry => bookEntry.Name).ToList()
                });
        }
    }
}
