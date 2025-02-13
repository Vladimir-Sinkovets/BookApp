using BookApp.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Server.Controllers
{
    public class BaseController : Controller
    {
        public IActionResult SendResult<T>(Result<T> result) where T : class
        {
            return result.Status switch
            {
                Status.Success => Ok(result),
                Status.NotFound => NotFound(new { result.Status, result.Message }),
                Status.Conflict => Conflict(new { result.Status, result.Message }),
                Status.BadData => BadRequest(new { result.Status, result.Message }),
                Status.ServerError => StatusCode(500, new { result.Status, result.Message }),
                _ => StatusCode(500, new { result.Status, result.Message }),
            };
        }
    }
}
