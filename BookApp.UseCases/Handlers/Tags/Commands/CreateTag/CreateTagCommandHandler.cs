using BookApp.Entities.Models;
using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.CreateTag
{
    public class CreateTagCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateTagCommand, CreateTagCommandResponse>
    {
        public async Task<CreateTagCommandResponse> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            //if (unitOfWork.TagsRepository.FirstOrDefault(t => t.Name == tag.Name) != null)
            //    throw new ContentAlreadyExistException();

            var tagEntry = new TagEntry()
            {
                Name = request.Name,
            };

            unitOfWork.TagsRepository.Add(tagEntry);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return new()
            {
                Id = tagEntry.Id,
                Name = tagEntry.Name,
            };
        }
    }
}
