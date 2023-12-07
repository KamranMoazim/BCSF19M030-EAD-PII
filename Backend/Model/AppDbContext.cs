using Microsoft.EntityFrameworkCore;

namespace Backend.Model
{
    public class AppDbContext : DbContext
    {
        public DbSet<Student> Student { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=MyLiteDb.db");
        }
    }
}