using System.Security.Claims;
using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Commands.RefreshToken
{
    public class RefreshTokenCommandHandler(
        IUnitOfWork unitOfWork,
        ITokenService tokenService) : IRequestHandler<RefreshTokenCommand, Result<RefreshTokenCommandResponse>>
    {
        public async Task<Result<RefreshTokenCommandResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var principal = tokenService.ValidateRefreshToken(request.Token);

            if (principal == null)
                return Result<RefreshTokenCommandResponse>.Create(Status.BadData, "Wrong token");

            var userId = int.Parse(principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

            var user = unitOfWork.UsersRepository.FirstOrDefault(u => userId == u.Id);

            if (user == null)
                return Result<RefreshTokenCommandResponse>.Create(Status.NotFound, "User not found");

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
