using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Books.Commands.UpdateBook
{
    public class UpdateBookCommandHandler(
        IUnitOfWork unitOfWork,
        ILogger<UpdateBookCommandHandler> logger) : IRequestHandler<UpdateBookCommand, Result<UpdateBookCommandResponse>>
    {
        public async Task<Result<UpdateBookCommandResponse>> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Attempting to update book with id: {id}", request.Id);

            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .First(b => b.Id == request.Id);

            if (bookEntry == null)
            {
                logger.LogWarning("Book not found with id: {id}", request.Id);

                return Result<UpdateBookCommandResponse>.Create(Status.NotFound, "Book not found");
            }

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

            logger.LogInformation("Book updated with id: {id}", request.Id);

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
