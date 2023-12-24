
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
        // public Dictionary<string, int> GetProvincialDistribution()
        public List<KeyValueDto> GetProvincialDistribution()
        {
            // Assuming that the province information is in the City property
            var provincialDistribution = _context.Student
                .Where(s => s.City != null)
                // .GroupBy(s => s.City)
                .AsEnumerable() // Switch to client-side evaluation
                .GroupBy(s => s.City, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(g => g.Key, g => g.Count());

            return DictionaryToList(provincialDistribution);
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

        // public Dictionary<int, int> GetAgeDistribution()
        public List<KeyValueDto> GetAgeDistribution()
        {
            var today = DateTime.UtcNow.Date.ToDateOnly(); // using extension method, see Utils/HelperFuncs.cs

            var ageDistribution = _context.Student
                .Where(s => s.DateOfBirth != null)
                .ToList() // Fetch data from the database before applying the projection
                .Select(s => new
                {
                    Age = HelperFuncs.CalculateAge(s.DateOfBirth, today),
                })
                .GroupBy(s => s.Age)
                .OrderBy(g => g.Key)
                .ToDictionary(g => g.Key, g => g.Count());

            // return ageDistribution;


            return DictionaryToList(ageDistribution);
        }

        // public Dictionary<string, int> GetDepartmentDistribution()
        public List<KeyValueDto> GetDepartmentDistribution()
        {
            var departmentDistribution = _context.Student
                .Where(s => !string.IsNullOrEmpty(s.Department))
                .GroupBy(s => s.Department)
                .ToDictionary(g => g.Key, g => g.Count());

            // return departmentDistribution;
            return DictionaryToList(departmentDistribution);
        }

        // public Dictionary<string, int> GetDegreeDistribution()
        public List<KeyValueDto> GetDegreeDistribution()
        {
            var degreeDistribution = _context.Student
                .Where(s => !string.IsNullOrEmpty(s.DegreeTitle))
                .GroupBy(s => s.DegreeTitle)
                .ToDictionary(g => g.Key, g => g.Count());

            // return degreeDistribution;
            return DictionaryToList(degreeDistribution);
        }

        // public Dictionary<string, int> GetGenderDistribution()
        public List<KeyValueDto> GetGenderDistribution()
        {
            var genderDistribution = _context.Student
                .GroupBy(s => s.Gender ? "Male" : "Female")
                .ToDictionary(g => g.Key, g => g.Count());

            // return genderDistribution;
            return DictionaryToList(genderDistribution);
        }

        // public Dictionary<string, int> GetStudentsStatusGrid(int daysThreshold = 30)
        // public List<KeyValueDto> GetStudentsStatusGrid(int daysThreshold = 30)
        // {
        //     var currentDate = DateOnly.FromDateTime(DateTime.UtcNow.Date);

        //     var numberOfStudentsCurrentlyStudying = _context.Student
        //         .Count(s => s.StartDate <= currentDate && (s.EndDate == null || s.EndDate > currentDate));

        //     var startDateThreshold = currentDate.AddDays(-daysThreshold);
        //     var numberOfStudentsRecentlyEnrolled = _context.Student
        //         .Count(s => s.StartDate >= startDateThreshold);

        //     var endDateThreshold = currentDate.AddDays(daysThreshold);
        //     var numberOfStudentsAboutToGraduate = _context.Student
        //         .Count(s => s.EndDate != null && s.EndDate > currentDate && s.EndDate <= endDateThreshold);

        //     var numberOfStudentsGraduated = _context.Student
        //         .Count(s => s.EndDate != null && s.EndDate <= currentDate);

        //     var studentsStatusGrid = new Dictionary<string, int>
        //     {
        //         {"Currently Studying", numberOfStudentsCurrentlyStudying},
        //         {"Recently Enrolled", numberOfStudentsRecentlyEnrolled},
        //         {"About to Graduate", numberOfStudentsAboutToGraduate},
        //         {"Graduated", numberOfStudentsGraduated}
        //     };

        //     // return studentsStatusGrid;
        //     return DictionaryToList(studentsStatusGrid);
        // }
        public List<KeyValueDto> GetStudentsStatusGrid(int daysThreshold = 30)
        {
            var currentDate = DateTime.UtcNow.Date;

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

            return DictionaryToList(studentsStatusGrid);
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

            // Apply default values to the pagingInfo object
            // pagingInfo.ApplyDefaults();

            const int DefaultPageNumber = 1;
            const int DefaultPageSize = 10;
            const string DefaultOrderBy = "fullName"; // Provide your default value
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
            var query = _context.Student.AsQueryable();

            // int skip = (pagingInfo.PageNumber - 1) * pagingInfo.PageSize;
            int skip = (PageNumber - 1) * PageSize;

            var orderByLower = OrderBy.ToLower();
            var orderProperty = typeof(Student).GetProperties()
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

            var students = query.ToList();

            // var totalItems = _context.Student.Count(x => criteria(x));
            var totalItems = _context.Student.Count();

            return new PagedList<Student>
            (
                students,
                totalItems,
                // totalItems / pagingInfo.PageSize <= 0 ? 1 : totalItems / pagingInfo.PageSize
                totalItems! / PageSize! <= 0 ? 1 : totalItems! / PageSize!
            );
        }














        private static List<KeyValueDto> DictionaryToList(Dictionary<string, int> provincialDistribution)
        {
            var keyValueDtoList = provincialDistribution.Select(kv => new KeyValueDto
            {
                Key = kv.Key,
                Value = kv.Value.ToString() // Convert count to string, assuming Value is of type string in KeyValueDto
            }).ToList();

            return keyValueDtoList;
        }

        private static List<KeyValueDto> DictionaryToList(Dictionary<int, int> provincialDistribution)
        {
            var keyValueDtoList = provincialDistribution.Select(kv => new KeyValueDto
            {
                Key = kv.Key.ToString(),
                Value = kv.Value.ToString() // Convert count to string, assuming Value is of type string in KeyValueDto
            }).ToList();

            return keyValueDtoList;
        }
    
    }
}