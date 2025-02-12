using BookApp.Entities.Models;
using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Books.Commands.AddBook
{
    public class AddBookCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<AddBookCommand, Result<AddBookCommandResponse>>
    {
        public async Task<Result<AddBookCommandResponse>> Handle(AddBookCommand request, CancellationToken cancellationToken)
        {
            var bookEntry = new BookEntry()
            {
                Description = request.Description,
                Author = request.Author,
                Fragment = request.Fragment,
                Title = request.Title,
            };

            unitOfWork.BooksRepository.Add(bookEntry);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            if (request.Tags != null)
                bookEntry.Tags = GetTagsAsync(request.Tags);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

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

        private ICollection<TagEntry> GetTagsAsync(List<string> tags) // extract
        {
            return unitOfWork.TagsRepository.GetAll()
                .Where(t => tags.Contains(t.Name))
                .ToList();
        }
    }
}
