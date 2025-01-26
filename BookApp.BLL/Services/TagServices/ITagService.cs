using BookApp.BLL.Models;
using BookApp.DAL.Models;

namespace BookApp.BLL.Services.TagServices
{
    public interface ITagService
    {
        Task<TagData> CreateTagAsync(TagData tag);
        Task DeleteTagAsync(int id);
        IEnumerable<TagData> GetAll();
        TagData GetById(int id);
    }
}