using System.Security.Claims;
using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BookApp.UseCases.Handlers.Auth.Commands.RefreshToken
{
    public class RefreshTokenCommandHandler(
        IUnitOfWork unitOfWork,
        ITokenService tokenService,
        ILogger<RefreshTokenCommandHandler> logger) : IRequestHandler<RefreshTokenCommand, Result<RefreshTokenCommandResponse>>
    {
        public async Task<Result<RefreshTokenCommandResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Attempting to refresh token");

            var principal = tokenService.ValidateRefreshToken(request.Token);

            if (principal == null)
            {
                logger.LogWarning("Validation token error: Invalid refresh token");

                return Result<RefreshTokenCommandResponse>.Create(Status.BadData, "Wrong token");
            }

            var userId = int.Parse(principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

            var user = unitOfWork.UsersRepository.FirstOrDefault(u => userId == u.Id);

            if (user == null)
            {
                logger.LogWarning("User with id {id} not found", userId);

                return Result<RefreshTokenCommandResponse>.Create(Status.NotFound, "User not found");
            }

            logger.LogInformation("Token has refreshed for user {UserId}", userId);

            return Result<RefreshTokenCommandResponse>.Create(
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
