using MediatR;

namespace BookApp.UseCases.Handlers.Users.Queries.GetUserById
{
    public class GetUserByIdQuery : IRequest<GetUserByIdQueryResponse>
    {
        public int Id { get; set; }
    }
}
