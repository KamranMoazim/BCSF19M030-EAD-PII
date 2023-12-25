
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
        public List<string> AddNewDegree(string value)
        {
            Constants.Constants.AllDegrees.Add(value);
            return Constants.Constants.AllDegrees;
        }

        [HttpDelete("degrees")]
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
        public List<string> AddNewDepartment(string value)
        {
            Constants.Constants.AllDepartements.Add(value);
            return Constants.Constants.AllDepartements;
        }

        [HttpDelete("departments")]
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
        public List<string> AddNewCity(string value)
        {
            Constants.Constants.AllCities.Add(value);
            return Constants.Constants.AllCities;
        }

        [HttpDelete("cities")]
        public List<string> DeleteCity(string value)
        {
            Constants.Constants.AllCities.Remove(value);
            return Constants.Constants.AllCities;
        }




    }
}