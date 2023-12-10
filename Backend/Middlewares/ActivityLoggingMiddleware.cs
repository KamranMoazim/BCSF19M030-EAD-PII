// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

// namespace Backend.Middlewares
// {
//     public class ActivityLoggingMiddleware
//     {
        
//     }
// }



using Backend.Model;

namespace Backend.Middlewares
{
    public class ActivityLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ActivityLoggingMiddleware> _logger;

        public ActivityLoggingMiddleware(RequestDelegate next, ILogger<ActivityLoggingMiddleware> logger)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Invoke(HttpContext context)
        {

            // Capture the user information
            var userId = context.User.Identity?.Name; // Assuming you're using Identity and this is the user's ID
            var userName = context.User.Identity?.Name; // Assuming you want to store the user's name

            // Capture the activity details
            var action = context.Request.Method; // Example: "GET", "POST", etc.
            var target = context.Request.Path; // Example: "/api/users"
            var details = $"QueryString: {context.Request.QueryString}";

            // Log the activity
            var activity = new AppActivity
            {
                UserId = "userId",
                UserName = "userName",
                Action = action,
                Target = target,
                Details = details,
                Timestamp = DateTime.UtcNow
            };

            // Log the activity details
            // _logger.LogInformation($"User '{userId}' performed '{action}' on '{target}' at '{activity.Timestamp}'. Details: {details}");


            using (var scope = context.RequestServices.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                // Use dbContext as needed
                dbContext.AppActivity.Add(activity);
                dbContext.SaveChanges();
            }

            // _context.AppActivity.Add(activity);
            // _context.SaveChanges();

            // Continue the request pipeline
            await _next(context);
        }
    }
}
