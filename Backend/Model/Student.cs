using Backend.Model.HelpingModels;
using Newtonsoft.Json;

namespace Backend.Model
{
    public class Student : SoftDeletable
    {
        public string FullName { get; set; }
        public string RollNumber { get; set; }
        public string Email { get; set; }
        public bool Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string City { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Interest Interest { get; set; }

        public string Department { get; set; }
        public string DegreeTitle { get; set; }
        public string Subject { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}