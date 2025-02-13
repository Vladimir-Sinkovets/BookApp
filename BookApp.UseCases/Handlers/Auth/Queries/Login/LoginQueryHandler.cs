using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Auth.Queries.Login
{
    public class LoginQueryHandler(
        IUnitOfWork unitOfWork,
        ICryptoService cryptoService, 
        ITokenService tokenService,
        ILogger<LoginQueryHandler> logger) : IRequestHandler<LoginQuery, Result<LoginQueryResponse>>
    {
        public async Task<Result<LoginQueryResponse>> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Attempting to log in user with email: {Email}", request.Email);

            var user = unitOfWork.UsersRepository.FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
            {
                logger.LogWarning("User with email {Email} not found", request.Email);

                return Result<LoginQueryResponse>.Create(Status.NotFound, "User not found");
            }

            logger.LogInformation("User found with email: {Email}", request.Email);


            if (!cryptoService.VerifyPassword(request.Password, user.PasswordHash))
            {
                logger.LogWarning("Invalid password for user with email: {Email}", request.Email);

                return Result<LoginQueryResponse>.Create(Status.BadData, "Wrong data");
            }

            var accessToken = tokenService.GenerateAccessJwt(user);
            var refreshToken = tokenService.GenerateRefreshJwt(user);

            logger.LogInformation("Access and refresh tokens generated for user {Email}", request.Email);

            return Result<LoginQueryResponse>.Create(
                Status.Success,
                "Success",
                new()
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                });
        }
    }
}
