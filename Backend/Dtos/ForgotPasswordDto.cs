

using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class ForgotPasswordDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }
    }
}