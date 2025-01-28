namespace BookApp.Server.Models
{
    public class CreateBook
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Fragment { get; set; }
        public List<string>? Tags { get; set; }
    }
}
