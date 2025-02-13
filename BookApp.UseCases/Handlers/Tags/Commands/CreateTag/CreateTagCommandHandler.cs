using BookApp.Entities.Models;
using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Tags.Commands.CreateTag
{
    public class CreateTagCommandHandler(
        IUnitOfWork unitOfWork,
        ILogger<CreateTagCommandHandler> logger) : IRequestHandler<CreateTagCommand, Result<CreateTagCommandResponse>>
    {
        public async Task<Result<CreateTagCommandResponse>> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Attempting to create book with name: {name}", request.Name);

            if (unitOfWork.TagsRepository.FirstOrDefault(t => t.Name == request.Name) != null)
            {
                logger.LogWarning("Tag already exist: {name}", request.Name);

                return Result<CreateTagCommandResponse>.Create(Status.Conflict, "Tag already exist");
            }

            var tagEntry = new TagEntry()
            {
                Name = request.Name,
            };

            unitOfWork.TagsRepository.Add(tagEntry);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Tag added: {name}", tagEntry.Name);

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
