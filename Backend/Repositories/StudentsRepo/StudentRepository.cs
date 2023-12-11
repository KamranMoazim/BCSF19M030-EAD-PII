
using AutoMapper;
using Backend.Constants;
using Backend.Dtos;
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
        public Dictionary<string, int> GetProvincialDistribution()
        {
            // Assuming that the province information is in the City property
            var provincialDistribution = _context.Student
                .GroupBy(s => s.City)
                .ToDictionary(g => g.Key, g => g.Count());

            return provincialDistribution;
        }

        public List<DailyStudentCreationDto> GetDailyStudentCreationData()
        {
            var endDate = DateTime.UtcNow.Date;
            var startDate = endDate.AddDays(-29); // Last 30 days

            var dailyCreationData = _context.Student
                .Where(s => s.CreatedOn >= startDate && s.CreatedOn <= endDate)
                .GroupBy(s => s.CreatedOn.Date)
                .Select(g => new DailyStudentCreationDto
                {
                    Date = g.Key,
                    StudentCount = g.Count()
                })
                .OrderBy(d => d.Date)
                .ToList();

            return dailyCreationData;
        }

        public Dictionary<int, int> GetAgeDistribution()
        {
            var today = DateTime.UtcNow.Date.ToDateOnly(); // using extension method, see Utils/HelperFuncs.cs
            var ageDistribution = _context.Student
                .Where(s => s.DateOfBirth != null)
                .Select(s => new
                {
                    Age = HelperFuncs.CalculateAge(s.DateOfBirth, today),
                })
                .GroupBy(s => s.Age)
                .OrderBy(g => g.Key)
                .ToDictionary(g => g.Key, g => g.Count());

            return ageDistribution;
        }

        public Dictionary<string, int> GetDepartmentDistribution()
        {
            var departmentDistribution = _context.Student
                .Where(s => !string.IsNullOrEmpty(s.Department))
                .GroupBy(s => s.Department)
                .ToDictionary(g => g.Key, g => g.Count());

            return departmentDistribution;
        }

        public Dictionary<string, int> GetDegreeDistribution()
        {
            var degreeDistribution = _context.Student
                .Where(s => !string.IsNullOrEmpty(s.DegreeTitle))
                .GroupBy(s => s.DegreeTitle)
                .ToDictionary(g => g.Key, g => g.Count());

            return degreeDistribution;
        }

        public Dictionary<string, int> GetGenderDistribution()
        {
            var genderDistribution = _context.Student
                .GroupBy(s => s.Gender ? "Male" : "Female")
                .ToDictionary(g => g.Key, g => g.Count());

            return genderDistribution;
        }

        public Dictionary<string, int> GetStudentsStatusGrid(int daysThreshold = 30)
        {
            var currentDate = DateOnly.FromDateTime(DateTime.UtcNow.Date);

            var numberOfStudentsCurrentlyStudying = _context.Student
                .Count(s => s.StartDate <= currentDate && (s.EndDate == null || s.EndDate > currentDate));

            var startDateThreshold = currentDate.AddDays(-daysThreshold);
            var numberOfStudentsRecentlyEnrolled = _context.Student
                .Count(s => s.StartDate >= startDateThreshold);

            var endDateThreshold = currentDate.AddDays(daysThreshold);
            var numberOfStudentsAboutToGraduate = _context.Student
                .Count(s => s.EndDate != null && s.EndDate > currentDate && s.EndDate <= endDateThreshold);

            var numberOfStudentsGraduated = _context.Student
                .Count(s => s.EndDate != null && s.EndDate <= currentDate);

            var studentsStatusGrid = new Dictionary<string, int>
            {
                {"Currently Studying", numberOfStudentsCurrentlyStudying},
                {"Recently Enrolled", numberOfStudentsRecentlyEnrolled},
                {"About to Graduate", numberOfStudentsAboutToGraduate},
                {"Graduated", numberOfStudentsGraduated}
            };

            return studentsStatusGrid;
        }




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