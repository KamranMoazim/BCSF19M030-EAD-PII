
using Backend.Dtos;
using Backend.Model;
using Backend.Repositories.AppActivityRepo;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        
        public IAppActivityRepository AppActivityRepository { get; set; }

        public ActivityController(IAppActivityRepository appActivityRepository)
        {
            AppActivityRepository = appActivityRepository;
        }

        [HttpGet("/create-mock-data")]
        public ActionResult<string> CreateMockData()
        {
            AppActivityRepository.AddMockData();
            return Ok("OK");
        }


        [HttpGet]
        public ActionResult<IEnumerable<AppActivity>> Get()
        {

            return Ok(AppActivityRepository.Get());
        }

        [HttpGet("get-daily-activity-counts")]
        public ActionResult<IEnumerable<DailyActivityCountDto>> GetDailyActivityCounts()
        {
            return Ok(AppActivityRepository.GetDailyActivityCounts());
        }

        [HttpGet("get-hourly-activity-counts")]
        // public ActionResult<IEnumerable<HourlyActivityCountDto>> GetHourlyActivityCounts()
        public ActionResult<IEnumerable<DailyActivityCountDto>> GetHourlyActivityCounts()
        {
            return Ok(AppActivityRepository.GetHourlyActivityCounts());
        }

        [HttpGet("get-most-active-hours")]
        public ActionResult<IEnumerable<string>> GetMostActiveHours()
        {
            return Ok(AppActivityRepository.GetMostActiveHours());
        }

        [HttpGet("get-least-active-hours")]
        public ActionResult<IEnumerable<string>> GetLeastActiveHours()
        {
            return Ok(AppActivityRepository.GetLeastActiveHours());
        }

        [HttpGet("get-dead-hours")]
        public ActionResult<IEnumerable<string>> GetDeadHours()
        {
            return Ok(AppActivityRepository.GetDeadHours());
        }

    }
}