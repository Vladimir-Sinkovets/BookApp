using System.Text.Json;
using BookApp.UseCases;

namespace BookApp.Server.Middleware
{
    public class ServerExceptionHandlerMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;

                var jsonResponse = JsonSerializer.Serialize(
                    new
                    {
                        Status = Status.ServerError,
                        Message = "ServerError",
                    });

                await context.Response.WriteAsync(jsonResponse);
            }
        }
    }
}