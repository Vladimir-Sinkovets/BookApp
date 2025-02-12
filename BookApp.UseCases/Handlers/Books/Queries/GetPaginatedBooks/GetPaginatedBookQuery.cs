using MediatR;

namespace BookApp.UseCases.Handlers.Books.Queries.GetPaginatedBooks
{
    public class GetPaginatedBookQuery : IRequest<Result<GetpaginatedBookQueryResponse>>
    {
        public int Page { get; set; }
        public int ItemsPerPage { get; set; }
    }
}
