
using AutoMapper;
using Backend.Constants;
using Backend.Model;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.StudentsRepo
{
    public class StudentRepository : IStudentRepository
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public StudentRepository(AppDbContext context, IMapper map)
        {
            _context = context;
            _mapper = map;
        }




        // ISudentRepository implementation




        // IRepository implementation
        public bool Delete(long id)
        {
            var student = _context.Student.Find(id);
            if (student == null)
            {
                return false;
            }

            _context.Student.Remove(student);
            _context.SaveChanges();
            return true;
        }

        public Student Get(long id)
        {
            return _context.Student.Find(id);
        }

        public IEnumerable<Student> Get()
        {

            return _context.Student.ToList();
        }

        public Student Save(Student dto)
        {
            var student = _mapper.Map<Student>(dto);
            _context.Student.Add(student);
            _context.SaveChanges();
            return student;
        }
        public Student Update(Student dto)
        {
            var student = _mapper.Map<Student>(dto);
            _context.Student.Update(student);
            _context.SaveChanges();
            return student;
        }

        public IEnumerable<Student> Search(Predicate<Student> criteria)
        {
            return _context.Student.Where(x => criteria(x)).ToList();
        }

        public PagedList<Student> Page(Predicate<Student> criteria, PagingInfo pagingInfo)
        {
            // var query = _context.Student.Where(x => criteria(x)).AsQueryable();
            var query = _context.Student.AsQueryable();

            var skip = (pagingInfo.PageNumber - 1) * pagingInfo.PageSize;

            var orderByLower = pagingInfo.OrderBy.ToLower();
            var orderProperty = typeof(Student).GetProperties()
                .FirstOrDefault(prop => prop.Name.ToLower() == orderByLower);

            if (orderProperty != null)
            {
                if (pagingInfo.OrderDirection == OrderDirection.Ascending)
                {
                    query = query.OrderBy(x => EF.Property<object>(x, orderProperty.Name));
                }
                else
                {
                    query = query.OrderByDescending(x => EF.Property<object>(x, orderProperty.Name));
                }
            }

            query = query.Skip(skip).Take(pagingInfo.PageSize);

            var students = query.ToList();

            // var totalItems = _context.Student.Count(x => criteria(x));
            var totalItems = _context.Student.Count();

            return new PagedList<Student>
            (
                students,
                totalItems,
                totalItems / pagingInfo.PageSize <= 0 ? 1 : totalItems / pagingInfo.PageSize
            );
        }


        public PagedList<Student> PageOld(Predicate<Student> criteria, PagingInfo pagingInfo)
        {
            var query = _context.Student.AsQueryable();

            // Apply the filtering criteria
            if (criteria != null)
            {
                query = query.Where(x => criteria(x));
            }

            // Apply ordering
            if (!string.IsNullOrWhiteSpace(pagingInfo.OrderBy))
            {
                var orderProperty = typeof(Student).GetProperty(pagingInfo.OrderBy);

                if (pagingInfo.OrderDirection == OrderDirection.Ascending)
                {
                    query = query.OrderBy(x => EF.Property<object>(x, pagingInfo.OrderBy));
                }
                else
                {
                    query = query.OrderByDescending(x => EF.Property<object>(x, pagingInfo.OrderBy));
                }
            }

            // Apply paging
            var skip = (pagingInfo.PageNumber - 1) * pagingInfo.PageSize;
            query = query.Skip(skip).Take(pagingInfo.PageSize);

            // Materialize the results
            var students = query.ToList();

            // Calculate total count (considering criteria)
            var totalItems = _context.Student.Count(x => criteria(x));

            // return new PagedList<Student>(students, totalItems, pagingInfo.PageNumber, pagingInfo.PageSize);
            return new PagedList<Student>
            (
                students,
                totalItems,
                totalItems / pagingInfo.PageSize <= 0 ? 1 : totalItems / pagingInfo.PageSize
            );
        }

    }
}