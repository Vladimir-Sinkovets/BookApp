using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.DeleteTag
{
    public class DeleteTagCommand : IRequest<Result<DeleteTagCommandResponse>>
    {
        public string Name { get; set; }
    }
}
