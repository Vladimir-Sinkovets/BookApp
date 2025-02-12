using System.Security.Claims;
using BookApp.Entities.Models;

namespace BookApp.Infrastructure.Interfaces.Services
{
    public interface ITokenService
    {
        string GenerateAccessJwt(UserEntry userEntry);
        string GenerateRefreshJwt(UserEntry userEntry);
        ClaimsPrincipal ValidateRefreshToken(string refreshToken);
    }
}
