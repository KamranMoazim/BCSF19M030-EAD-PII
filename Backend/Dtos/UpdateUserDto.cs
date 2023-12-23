

using System.ComponentModel.DataAnnotations;
using Backend.Utils;

namespace Backend.Dtos
{
    public class UdpateUserDto
    {
        [Required, RoleAttribute]
        public string Role { get; set; }
    }
}