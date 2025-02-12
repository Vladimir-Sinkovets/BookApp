using BookApp.Server.Models;
using BookApp.UseCases.Handlers.Auth.Commands.RefreshToken;
using BookApp.UseCases.Handlers.Auth.Commands.Register;
using BookApp.UseCases.Handlers.Auth.Queries.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController(IMediator mediator) : BaseController
    {
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser model)
        {
            var result = await mediator.Send(new RegisterCommand()
            {
                Email = model.Email,
                Password = model.Password,
                Name = model.Name,
            });

            return SendResult(result);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUser model)
        {
            var result = await mediator.Send(new LoginQuery()
            {
                Email = model.Email,
                Password = model.Password,
            });

            return SendResult(result);
        }

        [HttpGet]
        [Route("refresh")]
        public async Task<IActionResult> RefreshAsync(string token)
        {
            var result = await mediator.Send(new RefreshTokenCommand()
            {
                Token = token,
            });

            return SendResult(result);
        }
    }
}
