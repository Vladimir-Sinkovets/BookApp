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
    public class UserController(IMediator mediator) : BaseController
    {
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var result = await mediator.Send(new GetUserByIdQuery()
            {
                Id = id,
            });

            return SendResult(result);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All(int page, int itemsPerPage)
        {
            var result = await mediator.Send(new GetPaginatedUsersQuery()
            {
                ItemsPerPage = itemsPerPage,
                Page = page,
            });

            return SendResult(result);
        }
    }
}
