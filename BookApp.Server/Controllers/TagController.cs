using BookApp.BLL.Models;
using BookApp.BLL.Services.TagServices;
using BookApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TagController(ITagService tagService) : Controller
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateTag model)
        {
            var tag = await tagService.CreateTagAsync(new TagData()
            {
                Name = model.Name,
            });

            return Created("", tag);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(int id)
        {
            var tag = tagService.GetById(id);

            return Ok(tag);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All()
        {
            var tags = tagService.GetAll();

            return Ok(tags);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            await tagService.DeleteTagAsync(id);

            return NoContent();
        }
    }
}
