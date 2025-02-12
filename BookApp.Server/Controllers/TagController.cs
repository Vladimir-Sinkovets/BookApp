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
    public class TagController(IMediator mediator) : BaseController
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateTag model)
        {
            var result = await mediator.Send(new CreateTagCommand()
            {
                Name = model.Name,
            });

            return SendResult(result);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await mediator.Send(new GetByIdQuery()
            {
                Id = id,
            });

            return SendResult(result);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All()
        {
            var result = await mediator.Send(new GetAllTagsQuery());

            return SendResult(result);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(string name)
        {
            var result = await mediator.Send(new DeleteTagCommand()
            {
                Name = name,
            });

            return SendResult(result);
        }
    }
}
