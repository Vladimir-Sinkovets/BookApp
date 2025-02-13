namespace BookApp.UseCases.Handlers.Books.Queries.GetPaginatedBooks
{
    public class GetpaginatedBookQueryResponse
    {
        public int LastPage { get; set; }
        public IEnumerable<BookDataResponse> Books { get; set; }
    }
}
