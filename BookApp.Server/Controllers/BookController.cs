using BookApp.BLL.Models;
using BookApp.BLL.Services.BookServices;
using BookApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("/api/[controller]")]
    public class BookController(IBookService bookService) : Controller
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateBook model)
        {
            var book = await bookService.AddBookAsync(new BookData()
            {
                Description = model.Description,
                Author = model.Author,
                Fragment = model.Fragment,
                TagIds = model.TagIds,
                Title = model.Title,
            });

            return Created("", book);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(bookService.GetBook(id));
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All(int page, int itemsPerPage)
        {
            var books = bookService.GetPaginatedBooks(page, itemsPerPage);

            return Ok(books);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update(UpdateBook model)
        {
            var book = await bookService.UpdateBookAsync(new BookData()
            {
                Description = model.Description,
                Author = model.Author,
                Fragment = model.Fragment,
                Id = model.Id,
                Title = model.Title,
                TagIds = model.TagIds ?? [],
            });

            return Ok(book);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            await bookService.DeleteAsync(id);

            return NoContent();
        }
    }
}
