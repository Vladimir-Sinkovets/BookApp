using MediatR;

namespace BookApp.UseCases.Handlers.Books.Queries.GetBook
{
    public class GetBookQuery : IRequest<Result<GetBookQueryResponse>>
    {
        public int Id { get; set; }
    }
}
