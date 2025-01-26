using BookApp.BLL.Exceptions;
using BookApp.BLL.Models;
using BookApp.DAL.Models;
using BookApp.DAL.Repositories;

namespace BookApp.BLL.Services.TagServices
{
    public class TagService(IUnitOfWork unitOfWork) : ITagService
    {
        public IEnumerable<TagData> GetAll()
        {
            return unitOfWork.TagsRepository.GetAll()
                .Take(100)
                .Select(t => new TagData()
                {
                    Id = t.Id,
                    Name = t.Name,
                });
        }
        public TagData GetById(int id)
        {
            var tagEntry = unitOfWork.TagsRepository
                .FirstOrDefault(t => t.Id == id);

            if (tagEntry == null)
                throw new NotFoundException();

            return new TagData()
            {
                Id = tagEntry.Id,
                Name = tagEntry.Name,
            };
        }

        public async Task<TagData> CreateTagAsync(TagData tag)
        {
            var tagEntry = new TagEntry()
            {
                Id = tag.Id,
                Name = tag.Name,
            };

            unitOfWork.TagsRepository.Add(tagEntry);

            await unitOfWork.SaveChangesAsync(new CancellationToken());

            return tag;
        }

        public async Task DeleteTagAsync(int id)
        {
            unitOfWork.TagsRepository.Remove(t => t.Id == id);

            await unitOfWork.SaveChangesAsync(new CancellationToken());
        }
    }
}
