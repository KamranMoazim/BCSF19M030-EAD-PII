

using Backend.Dtos;
using Backend.Interfaces;
using Backend.Model;

namespace Backend.Repositories.StudentsRepo
{
    public interface IStudentRepository : IRepository<Student>
    {
        // Dictionary<string, int> GetProvincialDistribution();
        List<Student> GetAllStudents();
        List<KeyValueDto> GetProvincialDistribution();
        List<DailyStudentCreationDto> GetDailyStudentCreationData();
        // Dictionary<int, int> GetAgeDistribution();
        // Dictionary<string, int> GetDepartmentDistribution();
        // public Dictionary<string, int> GetDegreeDistribution();
        // public Dictionary<string, int> GetGenderDistribution();
        // Dictionary<string, int> GetStudentsStatusGrid(int daysThreshold = 30);
        List<KeyValueDto>  GetAgeDistribution();
        List<KeyValueDto>  GetDepartmentDistribution();
        public List<KeyValueDto>  GetDegreeDistribution();
        public List<KeyValueDto>  GetGenderDistribution();
        List<KeyValueDto> GetStudentsStatusGrid(int daysThreshold = 30);
    }
}