
using Backend.Model.HelpingModels;

namespace Backend.Model
{
    public class User : SoftDeletable
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}