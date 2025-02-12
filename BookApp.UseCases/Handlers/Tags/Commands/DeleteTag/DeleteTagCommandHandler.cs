using BookApp.Infrastructure.Interfaces.Repositories;
using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.DeleteTag
{
    public class DeleteTagCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteTagCommand, DeleteTagCommandResponse>
    {
        public async Task<DeleteTagCommandResponse> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
        {
            unitOfWork.TagsRepository.Remove(t => t.Name == request.Name);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return new();
        }
    }
}
