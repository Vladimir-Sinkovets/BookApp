using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Commands.Register
{
    public class RegisterCommand : IRequest<RegisterCommandResponse>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
