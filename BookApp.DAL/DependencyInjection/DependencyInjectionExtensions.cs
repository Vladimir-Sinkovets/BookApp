using BookApp.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BookApp.DAL.DependencyInjection
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddDAL(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));

            return services.AddTransient<IUnitOfWork, UnitOfWork>();
        }
    }
}
