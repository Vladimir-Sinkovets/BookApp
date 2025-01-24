using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController : Controller
    {
        [HttpPost]
        [Route("register")]
        public IActionResult Register()
        {

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login()
        {
            return Ok();
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh()
        {
            return Ok();
        }
    }
}
