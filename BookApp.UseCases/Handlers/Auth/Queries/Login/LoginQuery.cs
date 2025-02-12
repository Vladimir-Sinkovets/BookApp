using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Queries.Login
{
    public class LoginQuery : IRequest<Result<LoginQueryResponse>>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
