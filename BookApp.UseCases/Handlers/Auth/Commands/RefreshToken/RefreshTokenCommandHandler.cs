using System.Security.Claims;
using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Commands.RefreshToken
{
    public class RefreshTokenCommandHandler(
        IUnitOfWork unitOfWork,
        ITokenService tokenService) : IRequestHandler<RefreshTokenCommand, RefreshTokenCommandResponse>
    {
        public async Task<RefreshTokenCommandResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var principal = tokenService.ValidateRefreshToken(request.Token);

            //if (principal == null)
            //    throw new BadRequestException();

            var userId = int.Parse(principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

            var user = unitOfWork.UsersRepository.FirstOrDefault(u => userId == u.Id);

            //if (user == null)
            //    throw new BadRequestException();

            return new()
            {
                AccessToken = tokenService.GenerateAccessJwt(user),
                RefreshToken = tokenService.GenerateRefreshJwt(user),
            };
        }
    }
}
