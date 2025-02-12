using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookApp.UseCases.Handlers.Books.Queries.GetBook
{
    public class GetBookQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetBookQuery, GetBookQueryResponse>
    {
        public async Task<GetBookQueryResponse> Handle(GetBookQuery request, CancellationToken cancellationToken)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .FirstOrDefault(b => b.Id == request.Id);

            //if (bookEntry == null)
            //    throw new NotFoundException();

            return new()
            {
                Id = bookEntry.Id,
                Title = bookEntry.Title,
                Description = bookEntry.Description,
                Author = bookEntry.Author,
                Fragment = bookEntry.Fragment,
                Tags = bookEntry.Tags?.Select(bookEntry => bookEntry.Name).ToList()
            };
        }
    }
}
