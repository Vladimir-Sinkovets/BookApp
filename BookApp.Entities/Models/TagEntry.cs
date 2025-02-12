namespace BookApp.Entities.Models
{
    public class TagEntry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<BookEntry> Books { get; set; }
    }
}
