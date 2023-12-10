
using Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppActivity>>> Get()
        {
            var k = new AppDbContext();
            return Ok(k.AppActivity.ToList());
        }
        //
        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppActivity>> Get(int id)
        // {
        //     return Ok(await _activityRepository.Get(id));
        // }
        //
        // [HttpPost]
        // public async Task<ActionResult<AppActivity>> Post([FromBody] AppActivity activity)
        // {
        //     return Ok(await _activityRepository.Add(activity));
        // }
        //
        // [HttpPut]
        // public async Task<ActionResult<AppActivity>> Put([FromBody] AppActivity activity)
        // {
        //     return Ok(await _activityRepository.Update(activity));
        // }
        //
        // [HttpDelete("{id}")]
        // public async Task<ActionResult<AppActivity>> Delete(int id)
        // {
        //     return Ok(await _activityRepository.Delete(id));
        // }
    }
}