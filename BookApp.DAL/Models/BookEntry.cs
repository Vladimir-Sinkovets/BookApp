namespace BookApp.DAL.Models
{
    public class BookEntry
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Fragment { get; set; }
        public ICollection<TagEntry> Tags { get; set; }
        public ICollection<UserEntry> Users { get; set; }
    }
}
