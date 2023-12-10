

using Backend.Model.HelpingModels;

namespace Backend.Dtos
{
    public class UserDto : Identity
    {
        public string Email { get; set; }
    }
}