

using System.ComponentModel.DataAnnotations;
using Backend.Utils;

namespace Backend.Dtos
{
    public class CreateUserDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, MinLength(8)]
        public string Password { get; set; }

        [Required, RoleAttribute]
        public string Role { get; set; }
    }
}