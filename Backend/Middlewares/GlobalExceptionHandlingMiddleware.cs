
using System.Net;
using Backend.Exceptions;

// using Backend.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Middlewares
{
    public class GlobalExceptionHandlingMiddleware : IMiddleware
    {

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                // Call the next delegate/middleware in the pipeline
                await next(context);
                if (context.Response.StatusCode == 403) // Check for Forbidden status code
                {
                    Console.WriteLine("**************************************************************");
                    // context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    // context.Response.ContentType = "application/problem+json";
                    await context.Response.WriteAsJsonAsync(new ProblemDetails
                    {
                        Status = context.Response.StatusCode,
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                        Title = "Forbidden",
                        Detail = "You do not have permission to access this resource."
                    });
                }
                else if (context.Response.StatusCode == 401) // Check for Forbidden status code
                {
                    Console.WriteLine("**************************************************************");
                    // context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    // context.Response.ContentType = "application/problem+json";
                    await context.Response.WriteAsJsonAsync(new ProblemDetails
                    {
                        Status = context.Response.StatusCode,
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                        Title = "Unauthorized",
                        Detail = "You are not Authorized to access this resource."
                    });
                } 
            }
            catch (DbUpdateException dbEx)
            {

                // Handle database-related exceptions
                Console.WriteLine($"Database exception: {dbEx.Message}");

                // context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                // context.Response.ContentType = "application/problem+json";

                await context.Response.WriteAsJsonAsync(new ProblemDetails
                {
                    Status = context.Response.StatusCode,
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                    Title = "Internal Server Error",
                    Detail = dbEx.Message,
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("==========================================================================");

                if (context.Response.StatusCode == 403) // Check for Forbidden status code
                {
                    // context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    // context.Response.ContentType = "application/problem+json";
                    await context.Response.WriteAsJsonAsync(new ProblemDetails
                    {
                        Status = context.Response.StatusCode,
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                        Title = "Forbidden",
                        Detail = "You do not have permission to access this resource."
                    });
                } 
                else if (ex is NotFoundException)
                {
                    // context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    // context.Response.ContentType = "application/problem+json";
                    await context.Response.WriteAsJsonAsync(new ProblemDetails
                    {
                        Status = context.Response.StatusCode,
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                        Title = "Not Found",
                        Detail = ex.Message,
                    });
                }
                else if (ex is InvalidException)
                {
                    // context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    // context.Response.ContentType = "application/problem+json";
                    await context.Response.WriteAsJsonAsync(new ProblemDetails
                    {
                        Status = context.Response.StatusCode,
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                        Title = "Bad Request",
                        Detail = ex.Message,
                    });
                }
                else
                {
                    // Log the unexpected exception
                    Console.WriteLine($"Unexpected error: {ex}");

                    // context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    // context.Response.ContentType = "application/problem+json";

                    await context.Response.WriteAsJsonAsync(new ProblemDetails
                    {
                        Status = context.Response.StatusCode,
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                        Title = "Internal Server Error",
                        Detail = "An unexpected error occurred.",
                    });
                }
            }
        }




    
    }
}