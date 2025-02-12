using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.CreateTag
{
    public class CreateTagCommand : IRequest<CreateTagCommandResponse>
    {
        public string Name { get; set; }
    }
}
