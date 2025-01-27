using BookApp.BLL.Services.AuthServices;
using BookApp.BLL.Services.BookServices;
using BookApp.BLL.Services.CryptoServices;
using BookApp.BLL.Services.TagServices;
using BookApp.BLL.Services.TokenServices;
using BookApp.BLL.Services.UserServices;
using Microsoft.Extensions.DependencyInjection;

namespace BookApp.BLL.DependencyInjection
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddBLL(this IServiceCollection services)
        {
            return services.AddTransient<IAuthService, AuthService>()
                .AddTransient<ITokenService, TokenService>()
                .AddTransient<ITagService, TagService>()
                .AddTransient<IUserService, UserService>()
                .AddTransient<IBookService, BookService>()
                .AddTransient<ICryptoService, CryptoService>();
        }
    }
}
