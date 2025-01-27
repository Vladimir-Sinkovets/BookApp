using BookApp.BLL.Services.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController(IUserService userService) : Controller
    {
        [HttpGet]
        [Route("get")]
        public IActionResult Get(int id)
        {
            var user = userService.GetUserById(id);

            return Ok(user);
        }

        [HttpGet]
        [Route("all")]
        public IActionResult All(int page, int itemsPerPage)
        {
            var users = userService.GetPaginatedUsers(page, itemsPerPage);

            return Ok(users);
        }
    }
}
