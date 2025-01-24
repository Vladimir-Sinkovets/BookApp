using BookApp.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BookApp.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
    }
}
