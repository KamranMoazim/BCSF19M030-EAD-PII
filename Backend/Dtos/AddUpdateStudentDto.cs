

using System.ComponentModel.DataAnnotations;
using Backend.Constants;
using Backend.Utils;

namespace Backend.Dtos
{
    public class AddUpdateStudentDto
    {

        [Required, MaxLength(50)]
        public string FullName { get; set; }


        [Required, MaxLength(15)]
        // [RegularExpression(@"^[A-Za-z]{3}\d{2}[A-Za-z]\d{3}$", ErrorMessage = "RollNumber must follow the pattern 'BCSF19M030'")]
        public string RollNumber { get; set; }


        [Required, MaxLength(50), EmailAddress]
        public string Email { get; set; }


        [Required]
        public Gender Gender { get; set; }


        [Required, DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }


        [Required, MaxLength(50)]
        public string City { get; set; }


        [Required, MaxLength(50)]
        public string Interest { get; set; }


        [Required, MaxLength(50), DepartmentAttribute]
        public string Department { get; set; }


        [Required, MaxLength(50), DegreeAttribute]
        public string DegreeTitle { get; set; }


        [Required, MaxLength(50)]
        public string Subject { get; set; }


        [Required, DataType(DataType.Date)]
        public DateTime StartDate { get; set; }


        [Required, DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
    }
}