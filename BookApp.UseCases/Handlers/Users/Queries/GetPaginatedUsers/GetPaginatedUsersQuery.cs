using MediatR;

namespace BookApp.UseCases.Handlers.Users.Queries.GetPaginatedUsers
{
    public class GetPaginatedUsersQuery : IRequest<GetPaginatedUsersQueryResponse>
    {
        public int Page { get; set; }
        public int ItemsPerPage { get; set; }
    }
}
