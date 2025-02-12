using BookApp.Entities.Models;
using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.CreateTag
{
    public class CreateTagCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateTagCommand, Result<CreateTagCommandResponse>>
    {
        public async Task<Result<CreateTagCommandResponse>> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            if (unitOfWork.TagsRepository.FirstOrDefault(t => t.Name == request.Name) != null)
                return Result<CreateTagCommandResponse>.Create(Status.Conflict, "Tag already exist");

            var tagEntry = new TagEntry()
            {
                Name = request.Name,
            };

            unitOfWork.TagsRepository.Add(tagEntry);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return Result<CreateTagCommandResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    Id = tagEntry.Id,
                    Name = tagEntry.Name,
                });
        }
    }
}
