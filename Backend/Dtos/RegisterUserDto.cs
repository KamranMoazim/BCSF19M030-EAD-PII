

using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class RegisterUserDto
    {

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, MinLength(8)]
        public string Password { get; set; }
    }
}