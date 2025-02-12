using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Commands.RefreshToken
{
    public class RefreshTokenCommand : IRequest<Result<RefreshTokenCommandResponse>>
    {
        public string Token { get; set; }
    }
}
