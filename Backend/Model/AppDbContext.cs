using Microsoft.EntityFrameworkCore;

namespace Backend.Model
{
    public class AppDbContext : DbContext
    {
        public DbSet<Student> Student { get; set; }
        public DbSet<Interest> Interest { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<AppActivity> AppActivity { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=MyLiteDb.db");
        }
    }
}