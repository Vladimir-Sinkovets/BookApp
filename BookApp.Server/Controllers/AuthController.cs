using BookApp.BLL.Services.AuthServices;
using BookApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController(IAuthService authService) : Controller
    {
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser model)
        {
            var response = await authService.RegisterUserAsync(new()
            {
                Email = model.Email,
                Password = model.Password,
                Name = model.Name,
            });

            return Ok(response);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginUser model)
        {
            var response = authService.LoginUser(new()
            {
                Email = model.Email,
                Password = model.Password,
            });

            return Ok(response);
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh(string token)
        {
            var response = authService.RefreshToken(token);

            return Ok(response);
        }
    }
}
