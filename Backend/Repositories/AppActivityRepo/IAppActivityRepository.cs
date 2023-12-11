
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Model;

namespace Backend.Repositories.AppActivityRepo
{
    public interface IAppActivityRepository : IRepository<AppActivity>
    {
        public List<DailyActivityCountDto> GetDailyActivityCounts();

        List<HourlyActivityCountDto> GetHourlyActivityCounts();

        List<string> GetMostActiveHours();

        List<string> GetLeastActiveHours();

        List<string> GetDeadHours(int threshold = 1);
    }
}

