using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.DeleteTag
{
    public class DeleteTagCommand : IRequest<DeleteTagCommandResponse>
    {
        public string Name { get; set; }
    }
}
