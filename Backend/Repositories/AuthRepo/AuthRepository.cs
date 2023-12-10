

using AutoMapper;
using Backend.Exceptions;
using Backend.Model;
using Backend.Utils;

namespace Backend.Interfaces.Repositories.AuthRepo
{
    public class AuthRepository : IAuthRepository
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AuthRepository(AppDbContext context, IMapper map)
        {
            _context = context;
            _mapper = map;
        }

        // !!! IAuthRepo
        public User Register(User user)
        {

            int salt = 12;
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password, salt);
            // bool correctPassword = BCrypt.Net.BCrypt.Verify(storedPassword, passwordHash);

            // user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = passwordHash;
            user.Role = "Student";

            _context.User.Add(user);
            _context.SaveChanges();

            return user;
        }
        
        public User GetUserByEmail(string email)
        {
            return _context.User.FirstOrDefault(u => u.Email == email);
        }

        public User Login(User user)
        {
            User userExists = GetUserByEmail(user.Email);

            if (userExists == null)
            {
                throw new InvalidException("Invalid Credentials");
            }

            if (string.IsNullOrEmpty(userExists.Password))
            {
                // Handle the case where the stored password is null or empty
                throw new InvalidOperationException("Stored password is null or empty");
            }

            int salt = 12;
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password, salt);
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(userExists.Password, passwordHash);

            // bool isValidPassword = BCrypt.Net.BCrypt.Verify(user.Password, userExists.Password);

            if (!isValidPassword)
            {
                throw new InvalidException("Invalid Credentials");
            }

            return userExists;
        }




        // !!! IRepo
        public bool Delete(long id)
        {

            User user = _context.User.Find(id);

            if (user == null)
            {
                return false;
            }

            _context.User.Remove(user);
            _context.SaveChanges();

            return true;
        }

        public User Get(long id)
        {

            // return _context.User.Find(id);
            return _mapper.Map<User>(_context.User.FirstOrDefault(u => u.ID == id));
        }

        public IEnumerable<User> Get()
        {
            // _context.User.RemoveRange(_context.User.ToArray());
            // _context.SaveChanges();

            // return _context.User.ToList();
            return _mapper.Map<List<User>>(_context.User.ToList());
        }


        public PagedList<User> Page(Predicate<User> criteria, PagingInfo pagingInfo)
        {
            throw new NotImplementedException();
        }

        public User Save(User dto)
        {

            _context.User.Add(dto);
            _context.SaveChanges();

            return dto;
        }

        public IEnumerable<User> Search(Predicate<User> criteria)
        {

            return _context.User.Where(u => criteria(u)).ToList();
        }

        public User Update(User dto)
        {

            _context.User.Update(dto);
            _context.SaveChanges();

            return dto;
        }
    }
}