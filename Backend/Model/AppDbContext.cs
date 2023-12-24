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
            // optionsBuilder.UseSqlite("Data Source=MyLiteDb.db");
            // optionsBuilder.UseSqlServer("Server=localhost,1433;Database=TestDb;User Id=sa;Password=Contraseña12345678;");
            // Server=your_server_name;Database=your_database_name;User Id=your_username;Password=your_password;
            // optionsBuilder.UseSqlServer("Server=localhost,1433;Database=TestDb;User Id=sa;Password=Contraseña12345678;Integrated Security=True;Encrypt=False");
            optionsBuilder.UseSqlServer("server=localhost;database=newcomparer;trusted_connection=false;User Id=sa;Password=Contraseña12345678;Persist Security Info=False;Encrypt=False");
        }
    }
}