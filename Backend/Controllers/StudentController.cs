
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

        [HttpGet("interests")]
        public ActionResult<IEnumerable<Interest>> GetAllInterests()
        {
            return Ok(InterestRepository.Get());
        }

        [HttpPost]
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

        [HttpGet]
        public ActionResult<PagedList<Student>> GetAllStudents([FromQuery] PagingInfo pagingInfo)
        // public ActionResult<List<Student>> GetAllStudents([FromQuery] PagingInfo pagingInfo)
        {

            // Console.WriteLine("Page Number: " + pagingInfo.PageNumber);
            // Console.WriteLine("Page Size: " + pagingInfo.PageSize);
            // Console.WriteLine("Order Direction: " + pagingInfo.OrderDirection);
            // Console.WriteLine("Order By: " + pagingInfo.OrderBy);

            // Assuming you want to retrieve all students without any specific criteria
            Predicate<Student> allStudentsCriteria = x => true;

            var result = StudentRepository.Page(allStudentsCriteria, pagingInfo);

            return Ok(result);
        }

        [HttpGet("/{id}")]
        public ActionResult<Student> GetStudent(long id)
        {
            return Ok(StudentRepository.Get(id));
        }

        [HttpDelete("/{id}")]
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

        [HttpPut("/{id}")]
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

            StudentRepository.Update(_mapper.Map<Student>(studentDto));

            return Ok(new MessageResponseDto
            {
                Message = "Student updated successfully",
                Status = "success"
            });
        }



    }
}