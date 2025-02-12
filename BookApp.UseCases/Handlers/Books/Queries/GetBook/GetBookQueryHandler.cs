using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.UseCases.Handlers.Books.Commands.UpdateBook;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookApp.UseCases.Handlers.Books.Queries.GetBook
{
    public class GetBookQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetBookQuery, Result<GetBookQueryResponse>>
    {
        public async Task<Result<GetBookQueryResponse>> Handle(GetBookQuery request, CancellationToken cancellationToken)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .FirstOrDefault(b => b.Id == request.Id);

            if (bookEntry == null)
                return Result<GetBookQueryResponse>.Create(Status.NotFound, "Book not found");

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
