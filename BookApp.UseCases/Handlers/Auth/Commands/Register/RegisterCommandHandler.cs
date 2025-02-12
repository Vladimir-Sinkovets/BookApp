using BookApp.Entities.Emuns;
using BookApp.Entities.Models;
using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Commands.Register
{
    public class RegisterCommandHandler(
        IUnitOfWork unitOfWork,
        ICryptoService cryptoService,
        ITokenService tokenService) : IRequestHandler<RegisterCommand, Result<RegisterCommandResponse>>
    {
        public async Task<Result<RegisterCommandResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            if (unitOfWork.UsersRepository.FirstOrDefault(u => u.Email == request.Email) != null)
                return Result<RegisterCommandResponse>.Create(Status.Conflict, "Email already registered");

            var user = new UserEntry()
            {
                Email = request.Email,
                Name = request.Name,
                Role = UserRole.DefaultUser,
                PasswordHash = cryptoService.HashPassword(request.Password),
            };

            unitOfWork.UsersRepository.Add(user);

            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<RegisterCommandResponse>.Create(
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
