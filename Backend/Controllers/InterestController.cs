
using AutoMapper;
using Backend.Repositories.InterestRepo;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterestController : ControllerBase
    {
        public IInterestRepository InterestRepository { get; set; }
        private readonly IMapper _mapper;

        public InterestController(IInterestRepository interestRepository, IMapper map)
        {
            InterestRepository = interestRepository;
            _mapper = map;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(InterestRepository.Get());
        }

        [HttpGet("get-top-5-interests")]
        public IActionResult GetTop5Interests()
        {
            return Ok(InterestRepository.GetTop5Interests());
        }

        [HttpGet("get-bottom-5-interests")]
        public IActionResult GetBottom5Interests()
        {
            return Ok(InterestRepository.GetBottom5Interests());
        }

        [HttpGet("get-unique-interests-count")]
        public IActionResult GetUniqueInterestsCount()
        {
            return Ok(InterestRepository.GetUniqueInterestsCount());
        }
    }
}