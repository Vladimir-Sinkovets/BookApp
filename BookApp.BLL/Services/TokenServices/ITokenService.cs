using System.Security.Claims;
using BookApp.DAL.Models;

namespace BookApp.BLL.Services.TokenServices
{
    public interface ITokenService
    {
        string GenerateAccessJwt(UserEntry userEntry);
        string GenerateRefreshJwt(UserEntry userEntry);
        ClaimsPrincipal ValidateRefreshToken(string refreshToken);
    }
}
