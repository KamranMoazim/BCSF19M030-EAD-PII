
using Backend.Dtos;
using Backend.Interfaces.Repositories.AuthRepo;
using Backend.Model;
using Backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


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
            return Ok(AuthRepository.Get());
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult<MessageResponseDto> Register([FromBody] RegisterUserDto userDto)
        {

            User userExists = AuthRepository.GetUserByEmail(userDto.Email);

            if (userExists != null)
            {
                return BadRequest(new MessageResponseDto
                {
                    Status = "Error",
                    Message = "User already exists"
                });
            }

            User user = new User
            {
                Email = userDto.Email,
                Password = userDto.Password,
            };

            AuthRepository.Register(user);

            MessageResponseDto createResponseDto = new MessageResponseDto
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

            User userExists = AuthRepository.GetUserByEmail(userDto.Email);

            if (userExists == null)
            {
                return BadRequest(new MessageResponseDto
                {
                    Status = "Error",
                    Message = "Invalid Credentials"
                });
            }

            userExists.Password = userDto.Password;
            User user = AuthRepository.Login(userExists);

            string token = AuthUtils.CreateToken(user);

            LoginUserResponseDto loginUserResponseDto = new LoginUserResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    ID = user.ID,
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
                    var user = AuthRepository.Get(userId);

                    // Create the response DTO
                    var responseUserDto = new UserDto
                    {
                        ID = user.ID,
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
        public ActionResult<MessageResponseDto> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                // Check if the email exists in your system
                var user = AuthRepository.GetUserByEmail(forgotPasswordDto.Email);

                if (user == null)
                {
                    // Return a generic response to avoid leaking information about registered emails
                    return Ok(new MessageResponseDto
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

                return Ok(new MessageResponseDto
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



    }
}