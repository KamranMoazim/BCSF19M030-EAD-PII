

namespace Backend.Dtos
{
    public class LoginUserResponseDto
    {
        public string Token { get; set; }
        public UserDto User { get; set; }
    }
}