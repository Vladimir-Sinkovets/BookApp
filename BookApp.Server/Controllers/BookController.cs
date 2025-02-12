using BookApp.Server.Models;
using BookApp.UseCases.Handlers.Books.Commands.AddBook;
using BookApp.UseCases.Handlers.Books.Commands.DeleteBook;
using BookApp.UseCases.Handlers.Books.Commands.UpdateBook;
using BookApp.UseCases.Handlers.Books.Queries.GetBook;
using BookApp.UseCases.Handlers.Books.Queries.GetPaginatedBooks;
using BookApp.UseCases.Handlers.Tags.Commands.CreateTag;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]")]
    public class BookController(IMediator mediator) : BaseController
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateBook model)
        {
            var result = await mediator.Send(new AddBookCommand()
            {
                Description = model.Description,
                Author = model.Author,
                Fragment = model.Fragment,
                Tags = model.Tags,
                Title = model.Title,
            });

            return SendResult(result);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await mediator.Send(new GetBookQuery()
            {
                Id = id,
            });

            return SendResult(result);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All(int page, int itemsPerPage)
        {
            var result = await mediator.Send(new GetPaginatedBookQuery()
            {
                ItemsPerPage = itemsPerPage,
                Page = page,
            });

            return SendResult(result);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update(UpdateBook model)
        {
            var result = await mediator.Send(new UpdateBookCommand()
            {
                Description = model.Description,
                Author = model.Author,
                Fragment = model.Fragment,
                Id = model.Id,
                Title = model.Title,
                Tags = model.Tags ?? [],
            });

            return SendResult(result);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await mediator.Send(new DeleteBookCommand()
            {
                Id = id,
            });

            return SendResult(result);
        }
    }
}
