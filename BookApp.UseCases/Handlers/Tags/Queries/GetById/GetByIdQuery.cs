using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Queries.GetById
{
    public class GetByIdQuery : IRequest<Result<GetByIdQueryResponse>>
    {
        public int Id { get; set; }
    }
}
