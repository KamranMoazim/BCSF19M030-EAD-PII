

using AutoMapper;
using Backend.Constants;
using Backend.Dtos;
using Backend.Exceptions;
using Backend.Model;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

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

            _context.User.Add(user);
            _context.SaveChanges();

            return user;
        }
        
        public User GetUserByEmail(string email)
        {
            // _context.User.RemoveRange(_context.User.ToList());
            // _context.SaveChanges();

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

        public List<User> GetAllAdmins()
        {
            return _context.User.Where(u => u.Role != "Student").ToList();
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

            // Apply default values to the pagingInfo object
            // pagingInfo.ApplyDefaults();

            const int DefaultPageNumber = 1;
            const int DefaultPageSize = 10;
            const string DefaultOrderBy = "role"; // Provide your default value
            const OrderDirection DefaultOrderDirection = Constants.OrderDirection.Descending; // Provide your default value

            int PageNumber = DefaultPageNumber;
            int PageSize = DefaultPageSize;
            string OrderBy = DefaultOrderBy;
            OrderDirection OrderDirection = DefaultOrderDirection;
            
            if (pagingInfo.PageNumber != null)
            {
                PageNumber = pagingInfo.PageNumber.Value;
            }

            if (pagingInfo.PageSize != null)
            {
                PageSize = pagingInfo.PageSize.Value;
            }

            if (pagingInfo.OrderBy != null)
            {
                OrderBy = pagingInfo.OrderBy;
            }

            if (pagingInfo.OrderDirection != null)
            {
                OrderDirection = pagingInfo.OrderDirection.Value;
            }


            // var query = _context.Student.Where(x => criteria(x)).AsQueryable();
            var query = _context.User.AsQueryable();

            // int skip = (pagingInfo.PageNumber - 1) * pagingInfo.PageSize;
            int skip = (PageNumber - 1) * PageSize;

            var orderByLower = OrderBy.ToLower();
            var orderProperty = typeof(User).GetProperties()
                .FirstOrDefault(prop => prop.Name.ToLower() == orderByLower);

            if (orderProperty != null)
            {
                if (OrderDirection == OrderDirection.Ascending)
                {
                    query = query.OrderBy(x => EF.Property<object>(x, orderProperty.Name));
                }
                else
                {
                    query = query.OrderByDescending(x => EF.Property<object>(x, orderProperty.Name));
                }
            }

            query = query.Skip(skip).Take(PageSize);

            var users = query.ToList();

            // var totalItems = _context.Student.Count(x => criteria(x));
            var totalItems = _context.User.Count();

            return new PagedList<User>
            (
                users,
                totalItems,
                // totalItems / pagingInfo.PageSize <= 0 ? 1 : totalItems / pagingInfo.PageSize
                totalItems / PageSize <= 0 ? 1 : totalItems! / PageSize!
            );


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

        public User UpdatePassword(User user)
        {
            int salt = 12;
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password, salt);
            // bool correctPassword = BCrypt.Net.BCrypt.Verify(storedPassword, passwordHash);

            // user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = passwordHash;

            _context.User.Update(user);
            _context.SaveChanges();

            return user;
        }






    }
}