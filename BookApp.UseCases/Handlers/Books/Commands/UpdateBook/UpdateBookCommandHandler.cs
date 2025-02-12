using BookApp.Entities.Models;
using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookApp.UseCases.Handlers.Books.Commands.UpdateBook
{
    public class UpdateBookCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<UpdateBookCommand, UpdateBookCommandResponse>
    {
        public async Task<UpdateBookCommandResponse> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
        {
            var bookEntry = unitOfWork.BooksRepository.GetAll()
                .Include(b => b.Tags)
                .First(b => b.Id == request.Id);

            //if (bookEntry == null)
            //    throw new NotFoundException();

            bookEntry.Title = request.Title;
            bookEntry.Fragment = request.Fragment;
            bookEntry.Author = request.Author;
            bookEntry.Description = request.Description;

            bookEntry.Tags.Clear();
            bookEntry.Tags = await GetTagsAsync(request.Tags);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

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

        private async Task<List<TagEntry>> GetTagsAsync(List<string> tags)
        {
            return await unitOfWork.TagsRepository.GetAll()
                .Where(t => tags.Contains(t.Name))
                .ToListAsync();
        }
    }
}
