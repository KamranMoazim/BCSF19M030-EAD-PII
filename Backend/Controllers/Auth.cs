// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;

// namespace Backend.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class Auth : ControllerBase
//     {
        
//     }
// }


using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Dtos.UserDtos;
using Backend.Repositories.AuthRepo;
using Backend.Utils;
using Backend.Dtos.GenericDTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public IAuthRepository AuthRepository { get; set; }

        public AuthController(IAuthRepository authRepository)
        {
            AuthRepository = authRepository;
        }

        [HttpGet("users")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<UserDto>> GetAllUsers()
        {
            return Ok(AuthRepository.GetAll());
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult<CreateResponseDto> Register([FromBody] CreateUserDto userDto)
        {

            User user = AuthRepository.Register(userDto);

            CreateResponseDto createResponseDto = new CreateResponseDto
            {
                Status = "Success",
                Message = "User created successfully"
            };

            return Ok(createResponseDto);
        }
        

        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult<LoginUserResponseDto> Login( [FromBody] LoginUserDto userDto)
        {
            User user = AuthRepository.Login(userDto);

            // string token = new AuthUtils(userManager, roleManager, _configuration).CreateToken(user);
            string token = AuthUtils.CreateToken(user);

            LoginUserResponseDto loginUserResponseDto = new LoginUserResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.ID,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email
                }
            };

            return Ok(loginUserResponseDto);
        }


        [HttpGet("me")]
        [Authorize]
        public ActionResult<UserDto> GetMe()
        {
            try
            {
                // var userId = HttpContext.Items["UserId"];
                // var userName = HttpContext.Items["UserName"];
                // var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userEmail = User.FindFirst(ClaimTypes.Name)?.Value;
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

                // Retrieve user information from the JWT token
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                
                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                {
                    // Fetch the user from your repository or database based on the user ID
                    var user = AuthRepository.GetUser(userId);

                    // Create the response DTO
                    var responseUserDto = new UserDto
                    {
                        Id = user.ID,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email
                    };

                    return Ok(responseUserDto);
                }
                else
                {
                    // If the user ID is not present or invalid, return an unauthorized result
                    return Unauthorized("Invalid user ID");
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                Console.WriteLine($"An error occurred while fetching user details: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }




        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public ActionResult<ForgotPasswordResponseDto> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                // Check if the email exists in your system
                var user = AuthRepository.GetUserByEmail(forgotPasswordDto.Email);

                if (user == null)
                {
                    // Return a generic response to avoid leaking information about registered emails
                    return Ok(new ForgotPasswordResponseDto
                    {
                        Status = "Success",
                        Message = "If the email exists in our system, we have sent a password reset link to your email."
                    });
                }

                // Generate a password reset token
                string resetToken = AuthUtils.GeneratePasswordResetToken(user);

                // Here, you might want to send an email to the user with the reset link or token
                // Include the reset token in the reset link or use it to validate the reset request

                // In a real-world scenario, you would send an email with a link like:
                // "https://yourdomain.com/reset-password?token=resetToken"

                return Ok(new ForgotPasswordResponseDto
                {
                    Status = "Success",
                    Message = "If the email exists in our system, we have sent a password reset link to your email."
                });
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                Console.WriteLine($"An error occurred while processing the forgot password request: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


































        [HttpGet("student")]
        // [Role("Student")]
        [Authorize(Roles = "Student")]
        // [Authorize(Policy = "StudentPolicy")]
        public ActionResult<string> StudentAccess()
        {
            return Ok("Hi Student");
        }

        [HttpGet("test")]
        [Authorize(Roles = "Student, Instructor, Admin")]
        public IActionResult Test()
        {

            return Ok("Test");
        }

        [HttpGet("instructor")]
        // [Role("Instructor")]
        [Authorize(Roles = "Instructor")]
        public ActionResult<string> InstructorAccess()
        {
            return Ok("Hi Instructor");
        }


        [HttpGet("public")]
        // [Role("Public")]
        [AllowAnonymous]
        public ActionResult<string> PublicAccess()
        {
            return Ok("Hi Public");
        }
    }
}