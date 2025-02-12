using BookApp.UseCases.Handlers.Users.Queries.GetPaginatedUsers;
using BookApp.UseCases.Handlers.Users.Queries.GetUserById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController(IMediator mediator) : Controller
    {
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var response = await mediator.Send(new GetUserByIdQuery()
            {
                Id = id,
            });

            return Ok(response);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All(int page, int itemsPerPage)
        {
            var response = await mediator.Send(new GetPaginatedUsersQuery()
            {
                ItemsPerPage = itemsPerPage,
                Page = page,
            });

            return Ok(response);
        }
    }
}
