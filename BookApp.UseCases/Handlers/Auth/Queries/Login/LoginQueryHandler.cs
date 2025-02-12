using System.Reflection;
using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Queries.Login
{
    public class LoginQueryHandler(
        IUnitOfWork unitOfWork,
        ICryptoService cryptoService, 
        ITokenService tokenService) : IRequestHandler<LoginQuery, LoginQueryResponse>
    {
        public async Task<LoginQueryResponse> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = unitOfWork.UsersRepository.FirstOrDefault(u => u.Email == request.Email);

            //if (user == null)
            //    throw new NotFoundException();

            //if (!cryptoService.VerifyPassword(request.Password, user.PasswordHash))
            //    throw new BadRequestException();

            return new()
            {
                AccessToken = tokenService.GenerateAccessJwt(user),
                RefreshToken = tokenService.GenerateRefreshJwt(user),
            };
        }
    }
}
