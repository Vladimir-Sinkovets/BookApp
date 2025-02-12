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
    public class AuthController(IMediator mediator) : Controller
    {
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser model)
        {
            var response = await mediator.Send(new RegisterCommand()
            {
                Email = model.Email,
                Password = model.Password,
                Name = model.Name,
            });

            return Ok(response);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUser model)
        {
            var response = await mediator.Send(new LoginQuery()
            {
                Email = model.Email,
                Password = model.Password,
            });

            return Ok(response);
        }

        [HttpGet]
        [Route("refresh")]
        public async Task<IActionResult> RefreshAsync(string token)
        {
            var response = await mediator.Send(new RefreshTokenCommand()
            {
                Token = token,
            });

            return Ok(response);
        }
    }
}
