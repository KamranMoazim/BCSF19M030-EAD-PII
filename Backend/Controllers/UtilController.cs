
using Microsoft.AspNetCore.Authorization;
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
            return Constants.Constants.AllDegrees;
        }

        [HttpPost("degrees")]
        [Authorize(Roles = Constants.Constants.ADMIN)]
        public List<string> AddNewDegree(string value)
        {
            Constants.Constants.AllDegrees.Add(value);
            return Constants.Constants.AllDegrees;
        }

        [HttpDelete("degrees")]
        [Authorize(Roles = Constants.Constants.ADMIN)]
        public List<string> DeleteDegree(string value)
        {
            Constants.Constants.AllDegrees.Remove(value);
            return Constants.Constants.AllDegrees;
        }



        [HttpGet("departments")]
        public List<string> GetAllDepartments()
        {
            return Constants.Constants.AllDepartements;
        }

        [HttpPost("departments")]
        [Authorize(Roles = Constants.Constants.ADMIN)]
        public List<string> AddNewDepartment(string value)
        {
            Constants.Constants.AllDepartements.Add(value);
            return Constants.Constants.AllDepartements;
        }

        [HttpDelete("departments")]
        [Authorize(Roles = Constants.Constants.ADMIN)]
        public List<string> DeleteDepartment(string value)
        {
            Constants.Constants.AllDepartements.Remove(value);
            return Constants.Constants.AllDepartements;
        }



        [HttpGet("cities")]
        public List<string> GetAllCities()
        {
            return Constants.Constants.AllCities;
        }

        [HttpPost("cities")]
        [Authorize(Roles = $"{Constants.Constants.ADMIN}, {Constants.Constants.SUB_ADMIN}")]
        public List<string> AddNewCity(string value)
        {
            Constants.Constants.AllCities.Add(value);
            return Constants.Constants.AllCities;
        }

        [HttpDelete("cities")]
        [Authorize(Roles = Constants.Constants.ADMIN)]
        public List<string> DeleteCity(string value)
        {
            Constants.Constants.AllCities.Remove(value);
            return Constants.Constants.AllCities;
        }




    }
}