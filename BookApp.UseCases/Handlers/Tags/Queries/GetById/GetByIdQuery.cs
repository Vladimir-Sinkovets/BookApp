using MediatR;

namespace BookApp.UseCases.Handlers.Tags.Queries.GetById
{
    public class GetByIdQuery : IRequest<GetByIdQueryResponse>
    {
        public int Id { get; set; }
    }
}
