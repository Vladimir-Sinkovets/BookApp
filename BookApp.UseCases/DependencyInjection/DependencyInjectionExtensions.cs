using Microsoft.Extensions.DependencyInjection;

namespace BookApp.BLL.DependencyInjection
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddUseCases(this IServiceCollection services)
        {
            return services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DependencyInjectionExtensions).Assembly));
        }
    }
}
