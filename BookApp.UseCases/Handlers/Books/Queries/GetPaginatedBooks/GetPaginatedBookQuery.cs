using MediatR;

namespace BookApp.UseCases.Handlers.Books.Queries.GetPaginatedBooks
{
    public class GetPaginatedBookQuery : IRequest<GetpaginatedBookQueryResponse>
    {
        public int Page { get; set; }
        public int ItemsPerPage { get; set; }
    }
}
