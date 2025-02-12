using System.Net;
using System.Text.Json;

namespace BookApp.Server.Middleware
{
    public class ServerExceptionHandlerMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            await _next(context);
            //try
            //{
            //    await _next(context);
            //}
            //catch (ContentAlreadyExistException)
            //{
            //    await HandleExceptionAsync(context, "Content already exist", HttpStatusCode.Conflict);
            //}
            //catch (NotFoundException)
            //{
            //    await HandleExceptionAsync(context, "Content not found", HttpStatusCode.NotFound);
            //}
            //catch (BadRequestException)
            //{
            //    await HandleExceptionAsync(context, "Bad request", HttpStatusCode.BadRequest);
            //}
            //catch (TokenException)
            //{
            //    await HandleExceptionAsync(context, "Bad token", HttpStatusCode.Unauthorized);
            //}
            //catch (Exception)
            //{
            //    await HandleExceptionAsync(context, "InternalServerError", HttpStatusCode.InternalServerError);
            //}
        }

        private static Task HandleExceptionAsync(HttpContext context, string message, HttpStatusCode statusCode)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;


            var jsonResponse = JsonSerializer.Serialize(
                new
                {
                    message,
                });

            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
