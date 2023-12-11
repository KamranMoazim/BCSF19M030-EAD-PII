
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Backend.Middlewares
{
    public class JwtToUserMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtToUserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Check if the request has an Authorization header with a JWT token
            if (context.Request.Headers.TryGetValue("Authorization", out var token))
            {
                var jwtHandler = new JwtSecurityTokenHandler();

                try
                {
                    var jsonToken = jwtHandler.ReadToken(token) as JwtSecurityToken;

                    if (jsonToken != null)
                    {
                        Console.WriteLine("JWT token is valid++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                        Console.WriteLine("TOKEN Result : " + jsonToken);

                        var claims = new ClaimsIdentity(jsonToken.Claims);
                        context.User = new ClaimsPrincipal(claims);

                        // Print email and role
                        var emailClaim = context.User.FindFirst(ClaimTypes.Email);
                        var roleClaim = context.User.FindFirst(ClaimTypes.Role);

                        if (emailClaim != null)
                        {
                            Console.WriteLine($"User Email: {emailClaim.Value}");
                        }

                        if (roleClaim != null)
                        {
                            Console.WriteLine($"User Role: {roleClaim.Value}");
                        }




                        // Example: Add a new claim to the user
                        var existingClaims = context.User.Claims.ToList(); // Get existing claims from the user

                        string roleName = roleClaim.Value; // Replace with your actual role
                        var rleClaim = new Claim(ClaimTypes.Role, roleName);
                        existingClaims.Add(rleClaim);


                        // Create a new ClaimsIdentity with the updated claims
                        var newClaimsIdentity = new ClaimsIdentity(existingClaims, context.User.Identity.AuthenticationType, ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                        // Create a new ClaimsPrincipal with the updated identity
                        var newClaimsPrincipal = new ClaimsPrincipal(newClaimsIdentity);


                        // Update the user in the HttpContext
                        context.User = newClaimsPrincipal;

                    }
                    
                }
                catch (Exception ex)
                {
                    // Handle token validation errors
                    Console.WriteLine($"Error validating JWT token: {ex.Message}");
                }
            }

            // Call the next delegate/middleware in the pipeline
            
            await _next(context);
        }




    }

    public static class JwtToUserMiddlewareExtensions
    {
        public static IApplicationBuilder UseJwtToUserMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtToUserMiddleware>();
        }
    }
}