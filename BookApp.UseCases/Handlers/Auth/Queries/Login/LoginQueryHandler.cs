using System.Reflection;
using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using BookApp.UseCases.Handlers.Auth.Commands.RefreshToken;
using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Queries.Login
{
    public class LoginQueryHandler(
        IUnitOfWork unitOfWork,
        ICryptoService cryptoService, 
        ITokenService tokenService) : IRequestHandler<LoginQuery, Result<LoginQueryResponse>>
    {
        public async Task<Result<LoginQueryResponse>> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = unitOfWork.UsersRepository.FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
                return Result<LoginQueryResponse>.Create(Status.NotFound, "User not found");

            if (!cryptoService.VerifyPassword(request.Password, user.PasswordHash))
                return Result<LoginQueryResponse>.Create(Status.BadData, "Wrong data");

            return Result<LoginQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    AccessToken = tokenService.GenerateAccessJwt(user),
                    RefreshToken = tokenService.GenerateRefreshJwt(user),
                });
        }
    }
}
