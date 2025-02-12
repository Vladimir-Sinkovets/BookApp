
namespace BookApp.UseCases.Handlers.Tags.Queries.GetAllTags
{
    public class GetAllTagsQueryResponse
    {
        public IEnumerable<TagDataResponse> Tags { get; internal set; }
    }
}
