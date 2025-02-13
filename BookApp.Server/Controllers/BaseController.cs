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
                Status.NotFound => NotFound(result),
                Status.Conflict => Conflict(result),
                Status.BadData => BadRequest(result),
                Status.ServerError => StatusCode(500, result),
                _ => StatusCode(500, result),
            };
        }
    }
}
