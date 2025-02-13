
namespace BookApp.UseCases.Handlers.Users.Queries.GetPaginatedUsers
{
    public class GetPaginatedUsersQueryResponse
    {
        public IEnumerable<UserDataResponse> Users { get; internal set; }
        public int LastPage { get; internal set; }
    }
}
