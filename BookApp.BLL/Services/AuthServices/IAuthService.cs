
using BookApp.BLL.Services.AuthServices.Models;

namespace BookApp.BLL.Services.AuthServices
{
    public interface IAuthService
    {
        TokenResponse LoginUser(UserData user);
        TokenResponse RefreshToken(string token);
        public Task<TokenResponse> RegisterUserAsync(UserData model);
    }
}
