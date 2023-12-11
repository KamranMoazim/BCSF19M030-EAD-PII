

using Backend.Model;

namespace Backend.Interfaces.Repositories.AuthRepo
{
    public interface IAuthRepository : IRepository<User>
    {
        User Register(User user);
        User Login(User user);

        User GetUserByEmail(string email);

        List<User> GetAllAdmins();
    }
}