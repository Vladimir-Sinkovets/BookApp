using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.DeleteTag
{
    public class DeleteTagCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteTagCommand, Result<DeleteTagCommandResponse>>
    {
        public async Task<Result<DeleteTagCommandResponse>> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
        {
            unitOfWork.TagsRepository.Remove(t => t.Name == request.Name);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<DeleteTagCommandResponse>.Create(Status.Success, "Tag successfully deleted");
        }
    }
}
