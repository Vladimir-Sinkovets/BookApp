using BookApp.BLL.DependencyInjection;
using BookApp.DAL.DependencyInjection;
using BookApp.Server.Middleware;
using Microsoft.AspNetCore.Diagnostics;

namespace BookApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDAL(connectionString);
            builder.Services.AddBLL();

            var app = builder.Build();

            app.UseMiddleware<ServerExceptionHandlerMiddleware>();

            app.UseDefaultFiles();
            app.MapStaticAssets();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
