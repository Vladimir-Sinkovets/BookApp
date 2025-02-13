using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Tags.Commands.DeleteTag
{
    public class DeleteTagCommandHandler(
        IUnitOfWork unitOfWork,
        ILogger<DeleteTagCommandHandler> logger) : IRequestHandler<DeleteTagCommand, Result<DeleteTagCommandResponse>>
    {
        public async Task<Result<DeleteTagCommandResponse>> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Attempting to delete tag with name: {name}", request.Name);

            unitOfWork.TagsRepository.Remove(t => t.Name == request.Name);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Tag deleted with name: {name}", request.Name);

            return Result<DeleteTagCommandResponse>.Create(Status.Success, "Tag successfully deleted");
        }
    }
}
