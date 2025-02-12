using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookApp.UseCases.Handlers.Books.Commands.UpdateBook
{
    public class UpdateBookCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<UpdateBookCommand, Result<UpdateBookCommandResponse>>
    {
        public async Task<Result<UpdateBookCommandResponse>> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .First(b => b.Id == request.Id);

            if (bookEntry == null)
                return Result<UpdateBookCommandResponse>.Create(Status.NotFound, "Book not found");

            bookEntry.Title = request.Title;
            bookEntry.Fragment = request.Fragment;
            bookEntry.Author = request.Author;
            bookEntry.Description = request.Description;

            bookEntry.Tags.Clear();
            if (request.Tags != null)
                bookEntry.Tags = await unitOfWork.TagsRepository.GetAll()
                    .Where(t => request.Tags.Contains(t.Name))
                    .ToListAsync(cancellationToken);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<UpdateBookCommandResponse>.Create(
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
