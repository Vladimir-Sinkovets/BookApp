using BookApp.Entities.Models;
using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Books.Commands.AddBook
{
    public class AddBookCommandHandler(
        IUnitOfWork unitOfWork,
        ILogger<AddBookCommandHandler> logger) : IRequestHandler<AddBookCommand, Result<AddBookCommandResponse>>
    {
        public async Task<Result<AddBookCommandResponse>> Handle(AddBookCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Attempting to add book with title: {title}", request.Title);

            var bookEntry = new BookEntry()
            {
                Description = request.Description,
                Author = request.Author,
                Fragment = request.Fragment,
                Title = request.Title,
            };

            unitOfWork.BooksRepository.Add(bookEntry);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            if (request.Tags != null)
                bookEntry.Tags = await unitOfWork.TagsRepository.GetAll()
                    .Where(t => request.Tags.Contains(t.Name))
                    .ToListAsync(cancellationToken);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Book added with title: {title}", request.Title);

            return Result<AddBookCommandResponse>.Create(
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
