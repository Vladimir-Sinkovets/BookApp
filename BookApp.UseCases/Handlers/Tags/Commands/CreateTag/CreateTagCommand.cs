using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Commands.CreateTag
{
    public class CreateTagCommand : IRequest<Result<CreateTagCommandResponse>>
    {
        public string Name { get; set; }
    }
}
