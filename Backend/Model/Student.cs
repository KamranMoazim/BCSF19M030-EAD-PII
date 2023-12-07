using Backend.Model.HelpingModels;

namespace Backend.Model
{
    public class Student : SoftDeletable
    {
        public string FullName { get; set; }
        public string RollNumber { get; set; }
        public string Email { get; set; }
        public bool Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string City { get; set; }

        public Interest Interest { get; set; }

        public string Department { get; set; }
        public string DegreeTitle { get; set; }
        public string Subject { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }
}