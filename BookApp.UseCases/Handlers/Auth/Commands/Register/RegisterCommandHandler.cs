using BookApp.Entities.Emuns;
using BookApp.Entities.Models;
using System.Reflection;
using BookApp.Infrastructure.Interfaces.Repositories;
using BookApp.Infrastructure.Interfaces.Services;
using MediatR;

namespace BookApp.UseCases.Handlers.Auth.Commands.Register
{
    public class RegisterCommandHandler(
        IUnitOfWork unitOfWork,
        ICryptoService cryptoService,
        ITokenService tokenService) : IRequestHandler<RegisterCommand, RegisterCommandResponse>
    {
        public async Task<RegisterCommandResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            //if (unitOfWork.UsersRepository.FirstOrDefault(u => u.Email == request.Email) != null)
            //    throw new ContentAlreadyExistException();

            var user = new UserEntry()
            {
                Email = request.Email,
                Name = request.Name,
                Role = UserRole.DefaultUser,
                PasswordHash = cryptoService.HashPassword(request.Password),
            };

            unitOfWork.UsersRepository.Add(user);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return new()
            {
                AccessToken = tokenService.GenerateAccessJwt(user),
                RefreshToken = tokenService.GenerateRefreshJwt(user),
            };
        }
    }
}
