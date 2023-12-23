

using AutoMapper;
using Backend.Dtos;
using Backend.Model;
using Backend.Utils;

namespace Backend.Repositories.AppActivityRepo
{
    public class AppActivityRepository: IAppActivityRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AppActivityRepository(AppDbContext context, IMapper map)
        {
            _context = context;
            _mapper = map;
        }

        // IAppActivityRepository implementation
        public List<DailyActivityCountDto> GetDailyActivityCounts()
        {
            var endDate = DateTime.UtcNow.Date;
            var startDate = endDate.AddDays(-29); // Last 30 days

            var dailyActivityCounts = _context.AppActivity
                .Where(a => a.Timestamp >= startDate && a.Timestamp <= endDate)
                .GroupBy(a => a.Timestamp.Date)
                .Select(g => new DailyActivityCountDto
                {
                    Date = g.Key,
                    ActionCount = g.Count()
                })
                .OrderBy(d => d.Date)
                .ToList();

            return dailyActivityCounts;
        }


        public List<HourlyActivityCountDto> GetHourlyActivityCounts()
        {
            var endDate = DateTime.UtcNow;
            var startDate = endDate.AddHours(-24); // Last 24 hours

            var hourlyActivityCounts = _context.AppActivity
                .Where(a => a.Timestamp >= startDate && a.Timestamp <= endDate)
                .GroupBy(a => new
                {
                    Hour = a.Timestamp.Hour,
                    Minute = a.Timestamp.Minute / 15 * 15 // Round to the nearest 15-minute interval
                })
                .Select(g => new HourlyActivityCountDto
                {
                    Hour = g.Key.Hour,
                    Minute = g.Key.Minute,
                    ActionCount = g.Count()
                })
                .OrderBy(h => h.Hour)
                .ThenBy(m => m.Minute)
                .ToList();

            return hourlyActivityCounts;
        }

        public List<string> GetMostActiveHours()
        {
            var endDate = DateTime.UtcNow.Date;
            var startDate = endDate.AddDays(-29); // Last 30 days

            var hourlyActivityCounts = _context.AppActivity
                .Where(a => a.Timestamp >= startDate && a.Timestamp <= endDate)
                .GroupBy(a => a.Timestamp.Hour)
                .Select(g => new
                {
                    Hour = g.Key,
                    ActionCount = g.Count()
                })
                .OrderByDescending(h => h.ActionCount)
                .ToList();

            // Assuming you want to return multiple most active hours in case of ties
            var mostActiveHours = hourlyActivityCounts
                .Where(h => h.ActionCount == hourlyActivityCounts.First().ActionCount)
                .Select(h => FormatHour(h.Hour))
                .ToList();

            return mostActiveHours;
        }

        public List<string> GetLeastActiveHours()
        {
            var endDate = DateTime.UtcNow.Date;
            var startDate = endDate.AddDays(-29); // Last 30 days

            var hourlyActivityCounts = _context.AppActivity
                .Where(a => a.Timestamp >= startDate && a.Timestamp <= endDate)
                .GroupBy(a => a.Timestamp.Hour)
                .Select(g => new
                {
                    Hour = g.Key,
                    ActionCount = g.Count()
                })
                .OrderBy(h => h.ActionCount)
                .ToList();

            var leastActiveHours = hourlyActivityCounts
                .Where(h => h.ActionCount == hourlyActivityCounts.First().ActionCount)
                .Select(h => FormatHour(h.Hour))
                .ToList();

            return leastActiveHours;
        }

        public List<string> GetDeadHours(int threshold = 1)
        {
            var endDate = DateTime.UtcNow.Date;
            var startDate = endDate.AddDays(-29); // Last 30 days

            var hourlyActivityCounts = _context.AppActivity
                .Where(a => a.Timestamp >= startDate && a.Timestamp <= endDate)
                .GroupBy(a => a.Timestamp.Hour)
                .Select(g => new
                {
                    Hour = g.Key,
                    ActionCount = g.Count()
                })
                .Where(h => h.ActionCount <= threshold)
                .Select(h => FormatHour(h.Hour))
                .ToList();

            return hourlyActivityCounts;
        }

        private static string FormatHour(int hour)
        {
            return new DateTime(2023, 1, 1, hour, 0, 0).ToString("h tt"); // Assumes 2023 is a non-leap year
        }










        // IRepository implementation
        public IEnumerable<AppActivity> Get()
        {

            var appActivities = _context.AppActivity.ToList();
            return appActivities;
        }

        public AppActivity Get(long id)
        {
            throw new NotImplementedException();
        }

        public AppActivity Save(AppActivity dto)
        {
            throw new NotImplementedException();
        }

        public AppActivity Update(AppActivity dto)
        {
            throw new NotImplementedException();
        }

        public bool Delete(long id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AppActivity> Search(Predicate<AppActivity> criteria)
        {
            throw new NotImplementedException();
        }

        public PagedList<AppActivity> Page(Predicate<AppActivity> criteria, PagingInfo pagingInfo)
        {
            throw new NotImplementedException();
        }
    }
}