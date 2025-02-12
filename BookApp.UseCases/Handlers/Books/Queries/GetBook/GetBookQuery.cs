using MediatR;

namespace BookApp.UseCases.Handlers.Books.Queries.GetBook
{
    public class GetBookQuery : IRequest<GetBookQueryResponse>
    {
        public int Id { get; set; }
    }
}
