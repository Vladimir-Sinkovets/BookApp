using BookApp.Server.Models;
using BookApp.UseCases.Handlers.Tags.Commands.CreateTag;
using BookApp.UseCases.Handlers.Tags.Commands.DeleteTag;
using BookApp.UseCases.Handlers.Tags.Queries.GetAllTags;
using BookApp.UseCases.Handlers.Tags.Queries.GetById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TagController(IMediator mediator) : Controller
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateTag model)
        {
            var response = await mediator.Send(new CreateTagCommand()
            {
                Name = model.Name,
            });

            return Created("", response);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(int id)
        {
            var response = mediator.Send(new GetByIdQuery()
            {
                Id = id,
            });

            return Ok(response);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All()
        {
            var response = await mediator.Send(new GetAllTagsQuery());

            return Ok(response.Tags);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(string name)
        {
            await mediator.Send(new DeleteTagCommand()
            {
                Name = name,
            });

            return NoContent();
        }
    }
}
