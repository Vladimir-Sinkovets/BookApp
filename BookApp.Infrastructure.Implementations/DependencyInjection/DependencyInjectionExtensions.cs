using BookApp.Infrastructure.Implementations.Services;
using BookApp.Infrastructure.Interfaces.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BookApp.Infrastructure.Implementations.DependencyInjection
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            return services
                .AddTransient<ITokenService, TokenService>()
                .AddTransient<ICryptoService, CryptoService>();
        }
    }
}
