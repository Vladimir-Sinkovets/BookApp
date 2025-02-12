namespace BookApp.UseCases.Handlers.Books.Queries.GetBook
{
    public class GetBookQueryResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Fragment { get; set; }
        public List<string> Tags { get; set; }
    }
}
