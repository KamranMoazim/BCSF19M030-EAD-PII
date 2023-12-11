
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UtilController : ControllerBase
    {
        

        [HttpGet("degrees")]
        public List<string> GetAllDegrees()
        {

            // return new List<string> 
            // {
            //     "Associate Degree",
            //     "Bachelor's Degree",
            //     "M-Phil Degree",
            //     "Post Graduate Diploma",
            //     "Doctoral Degree",
            //     "Post Doctoral"
            // };

            return Constants.Constants.AllDegrees;
        }

        [HttpGet("departments")]
        public List<string> GetAllDepartments()
        {

            // return new List<string> 
            // {
            //     "Computer Science",
            //     "Software Engineering",
            //     "Information Technology",
            //     "Electrical Engineering",
            //     "Mechanical Engineering",
            //     "Civil Engineering",
            //     "Chemical Engineering",
            // };

            return Constants.Constants.AllDepartements;
        }
    }
}