
using AutoMapper;
using Backend.Dtos;
using Backend.Model;
using Backend.Repositories.InterestRepo;
using Backend.Repositories.StudentsRepo;
using Backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        
        public IInterestRepository InterestRepository { get; set; }
        public IStudentRepository StudentRepository { get; set; }
        private readonly IMapper _mapper;

        public StudentController(IInterestRepository interestRepository, IStudentRepository studentRepository, IMapper map)
        {
            InterestRepository = interestRepository;
            StudentRepository = studentRepository;
            _mapper = map;
        }

        // [HttpGet("interests")]
        // public ActionResult<IEnumerable<Interest>> GetAllInterests()
        // {
        //     return Ok(InterestRepository.Get());
        // }

        [HttpPost()]
        public MessageResponseDto AddStudent([FromBody] AddUpdateStudentDto studentDto)
        {
            Student student = _mapper.Map<Student>(studentDto);

            Interest interest = InterestRepository.GetInterestByName(studentDto.Interest);

            if (interest == null)
            {
                interest = new Interest
                {
                    Name = studentDto.Interest
                };
                Interest savedInterest = InterestRepository.Save(interest);
                student.Interest = savedInterest;
            } 
            else
            {
                student.Interest = interest;
            }

            StudentRepository.Save(student);


            return new MessageResponseDto
            {
                Message = "Student added successfully",
                Status = "success"
            };
        }

        // [HttpGet]
        // public ActionResult<IEnumerable<Student>> GetAllStudents()
        // {
        //     return Ok(StudentRepository.Get());
        // }

        [HttpGet()]
        public ActionResult<PagedList<Student>> GetAllStudents([FromQuery] PagingInfo pagingInfo)
        {

            // Assuming you want to retrieve all students without any specific criteria
            Predicate<Student> allStudentsCriteria = x => true;

            var result = StudentRepository.Page(allStudentsCriteria, pagingInfo);

            // List<AddUpdateStudentDto> addUpdateStudentDtos = result.Source.Select(s => _mapper.Map<AddUpdateStudentDto>(s)).ToList();

            // // new PagedList<AddUpdateStudentDto>
            // // {
            // //     Source=addUpdateStudentDtos,
            // //     NumberOfRows = result.NumberOfRows,
            // //     NumberOfPages = result.NumberOfRows / pagingInfo.PageSize <= 0 ? 1 : result.NumberOfRows / pagingInfo.PageSize
            // // };

            // var ok = new PagedList<AddUpdateStudentDto>
            // (
            //     addUpdateStudentDtos,
            //     result.NumberOfRows??result.NumberOfRows,
            //     result.NumberOfRows
            // );

            return Ok(result);
        }


        [HttpGet("/api/Student/all")]
        public ActionResult<List<Student>> GetAllStudentsAPI()
        {
            var result = StudentRepository.GetAllStudents();

            return Ok(result);
        }

        [HttpGet("/api/Student/{id}")]
        public ActionResult<Student> GetStudent(long id)
        {
            var st = StudentRepository.Get(id);
            return Ok(st);
        }

        [HttpDelete("/api/Student/{id}")]
        public ActionResult<MessageResponseDto> DeleteStudent(long id)
        {
            var student = StudentRepository.Get(id);
            if (student == null)
            {
                return NotFound(new MessageResponseDto
                {
                    Message = "Student not found",
                    Status = "error"
                });
            }

            StudentRepository.Delete(id);

            return Ok(new MessageResponseDto
            {
                Message = "Student deleted successfully",
                Status = "success"
            });
        }

        [HttpPut("/api/Student/{id}")]
        public ActionResult<MessageResponseDto> UpdateStudent(long id, [FromBody] AddUpdateStudentDto studentDto)
        {
            var student = StudentRepository.Get(id);
            if (student == null)
            {
                return NotFound(new MessageResponseDto
                {
                    Message = "Student not found",
                    Status = "error"
                });
            }

            student.FullName = studentDto.FullName;
            student.RollNumber = studentDto.RollNumber;
            student.DateOfBirth = studentDto.DateOfBirth;
            student.City = studentDto.City;
            student.Email = studentDto.Email;

            Interest interest = InterestRepository.GetInterestByName(studentDto.Interest);
            student.Interest = interest;

            student.Department = studentDto.Department;
            student.DegreeTitle = studentDto.DegreeTitle;
            student.Subject = studentDto.Subject;
            student.StartDate = studentDto.StartDate;
            student.EndDate = studentDto.EndDate;
            // student.Gender = studentDto.Gender;

            StudentRepository.Update(student);

            return Ok(new MessageResponseDto
            {
                Message = "Student updated successfully",
                Status = "success"
            });
        }







        [HttpGet("get-provincial-distribution")]
        // public ActionResult<Dictionary<string, int>> GetProvincialDistribution()
        public ActionResult<List<KeyValueDto>> GetProvincialDistribution()
        {
            return Ok(StudentRepository.GetProvincialDistribution());
        }

        [HttpGet("get-daily-student-creation-data")]
        public ActionResult<List<DailyStudentCreationDto>> GetDailyStudentCreationData()
        {
            return Ok(StudentRepository.GetDailyStudentCreationData());
        }

        [HttpGet("get-age-distribution")]
        // public ActionResult<Dictionary<int, int>> GetAgeDistribution()
        public ActionResult<List<KeyValueDto>> GetAgeDistribution()
        {
            return Ok(StudentRepository.GetAgeDistribution());
        }

        [HttpGet("get-department-distribution")]
        // public ActionResult<Dictionary<string, int>> GetDepartmentDistribution()
        public ActionResult<List<KeyValueDto>> GetDepartmentDistribution()
        {
            return Ok(StudentRepository.GetDepartmentDistribution());
        }

        [HttpGet("get-degree-distribution")]
        // public Dictionary<string, int> GetDegreeDistribution()
        public ActionResult<List<KeyValueDto>> GetDegreeDistribution()
        {
            return Ok(StudentRepository.GetDegreeDistribution());
        }

        [HttpGet("get-gender-distribution")]
        // public Dictionary<string, int> GetGenderDistribution()
        public ActionResult<List<KeyValueDto>> GetGenderDistribution()
        {
            return Ok(StudentRepository.GetGenderDistribution());
        }

        [HttpGet("get-students-status-grid")]
        // public Dictionary<string, int> GetStudentsStatusGrid()
        public ActionResult<List<KeyValueDto>> GetStudentsStatusGrid()
        {
            return Ok(StudentRepository.GetStudentsStatusGrid());
        }



    }
}