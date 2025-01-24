using BookApp.DAL.Emuns;

namespace BookApp.DAL.Models
{
    public class UserEntry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<BookEntry> Books { get; set; }
    }
}
