using System.Security.Claims;
using BookApp.BLL.Exceptions;
using BookApp.BLL.Models;
using BookApp.BLL.Services.CryptoServices;
using BookApp.BLL.Services.TokenServices;
using BookApp.DAL.Emuns;
using BookApp.DAL.Models;
using BookApp.DAL.Repositories;

namespace BookApp.BLL.Services.AuthServices
{
    public class AuthService(
        IUnitOfWork unitOfWork,
        ICryptoService cryptoService,
        ITokenService tokenService) : IAuthService
    {
        public TokenResponse LoginUser(UserData model)
        {
            var user = unitOfWork.UsersRepository.FirstOrDefault(u => u.Email == model.Email);
                
            if (user == null)
                throw new NotFoundException();

            if (!cryptoService.VerifyPassword(model.Password, user.PasswordHash))
                throw new BadRequestException();

            return GenerateTokens(user);
        }

        public TokenResponse RefreshToken(string token)
        {
            var principal = tokenService.ValidateRefreshToken(token);

            if (principal == null)
                throw new BadRequestException();

            var userId = int.Parse(principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

            var user = unitOfWork.UsersRepository.FirstOrDefault(u =>  userId == u.Id);

            if (user == null )
                throw new BadRequestException();

            return GenerateTokens(user);
        }

        public async Task<TokenResponse> RegisterUserAsync(UserData model)
        {
            if (unitOfWork.UsersRepository.FirstOrDefault(u => u.Email == model.Email) != null)
                throw new ContentAlreadyExistException();

            var user = new UserEntry()
            {
                Email = model.Email,
                Name = model.Name,
                Role = UserRole.DefaultUser,
                PasswordHash = cryptoService.HashPassword(model.Password),
            };

            unitOfWork.UsersRepository.Add(user);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return GenerateTokens(user);
        }

        private TokenResponse GenerateTokens(UserEntry user)
        {
            return new TokenResponse()
            {
                AccessToken = tokenService.GenerateAccessJwt(user),
                RefreshToken = tokenService.GenerateRefreshJwt(user),
            };
        }
    }
}
