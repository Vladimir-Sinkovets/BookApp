namespace BookApp.UseCases.Handlers.Books.Queries.GetPaginatedBooks
{
    public class BookDataResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public List<string> Tags { get; set; }
    }
}
