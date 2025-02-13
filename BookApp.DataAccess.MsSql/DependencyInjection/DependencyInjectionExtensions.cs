using BookApp.DataAccess.MsSql.Repositories;
using BookApp.Infrastructure.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BookApp.DataAccess.MsSql.DependencyInjection
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddSqlServer(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));

            return services.AddTransient<IUnitOfWork, UnitOfWork>();
        }
    }
}
