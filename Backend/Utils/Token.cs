using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Model;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Utils
{
    public static class AuthUtils
    {

        private static IDataProtector _dataProtector;

        // Initialize the data protector during application startup
        public static void InitializeDataProtector(IDataProtectionProvider dataProtectionProvider)
        {
            _dataProtector = dataProtectionProvider.CreateProtector("PasswordResetTokenPurpose");
        }

        public static string CreateToken(User user)
        {
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                // new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                // new Claim(ClaimTypes.Role, user.UserType.ToString())
                new Claim(ClaimTypes.Role, user.Role)
            };

            // Console.WriteLine("UserType: " + user.Role.ToString());

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM"));


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                IssuedAt = DateTime.UtcNow,
                Issuer = "http://localhost:61955",
                Audience = "http://localhost:4200",
                Expires = DateTime.UtcNow.AddHours(30),
                // SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            // var token = new System.IdentityModel.Tokens.JwtSecurityToken(jwt);

            return tokenHandler.WriteToken(token);
        }



        public static string GeneratePasswordResetToken(User user)
        {
            if (_dataProtector == null)
            {
                throw new InvalidOperationException("DataProtector has not been initialized.");
            }

            // Create a payload containing user-specific data
            var payload = $"{user.ID}-{user.Email}-{DateTime.UtcNow}";

            // Protect the payload using the data protector
            string encryptedPayload = _dataProtector.Protect(payload);

            return encryptedPayload;
        }

        public static bool TryDecryptPasswordResetToken(string token, out PasswordResetTokenData tokenData)
        {
            tokenData = null;

            if (_dataProtector == null)
            {
                throw new InvalidOperationException("DataProtector has not been initialized.");
            }

            try
            {
                // Attempt to unprotect the encrypted payload
                string decryptedPayload = _dataProtector.Unprotect(token);

                // Parse the payload into user-specific data
                string[] parts = decryptedPayload.Split('-');
                if (parts.Length == 3 && int.TryParse(parts[0], out int userId) && DateTime.TryParse(parts[2], out DateTime createdAt))
                {
                    tokenData = new PasswordResetTokenData
                    {
                        UserId = userId,
                        Email = parts[1],
                        CreatedAt = createdAt
                    };

                    return true;
                }

                return false;
            }
            catch (Exception)
            {
                // Token decryption failed
                return false;
            }
        }

        
    }

    public class PasswordResetTokenData
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}