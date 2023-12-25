

using AutoMapper;
using Backend.Dtos;
using Backend.Model;
using Backend.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;


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

        public bool AddMockData() 
        {
            // string filePath = "Mock/interest_data.json";
            // var jsonData = File.ReadAllText(filePath);
            // var entities = JsonConvert.DeserializeObject<List<AppActivity>>(jsonData);
            // foreach (var activity in entities)
            // {
            //     _context.AppActivity.Add(
            //         new AppActivity 
            //         {
            //             UserId = activity.UserId??"ok",
            //             UserName = activity.UserName??"ok",
            //             Action = activity.Action??"ok",
            //             Target = activity.Target??"ok",
            //             Details = activity.Details??"ok",
            //             Timestamp = DateTime.UtcNow,
            //         }
            //     );
            // }
            // _context.SaveChanges();

            // string filePath = "Mock/interest_data.json";
            // var jsonData = File.ReadAllText(filePath);
            // var entities = JsonConvert.DeserializeObject<List<Interest>>(jsonData);
            // foreach (var activity in entities)
            // {
            //     _context.Interest.Add(
            //         new Interest 
            //         {
            //             Name = activity.Name??"ok",
            //             CreatedBy = activity.CreatedBy??"ok",
            //             CreatedOn = DateTime.UtcNow,
            //             ModifiedBy = activity.ModifiedBy??"ok",
            //             ModifiedOn = DateTime.UtcNow,
            //             IsDeleted = false,
            //         }
            //     );
            // }
            // _context.SaveChanges();


            // string filePath = "Mock/student_data.json";
            // Random random = new Random();
            // var jsonData = File.ReadAllText(filePath);
            // var entities = JsonConvert.DeserializeObject<List<Student>>(jsonData);
            // foreach (var student in entities)
            // {
            //     int randomInterestId = random.Next(1, 101);
            //     _context.Student.Add(
            //         new Student 
            //         {
            //             FullName = student.FullName??"ok",
            //             Email = student.Email??"ok",
            //             CreatedBy = student.CreatedBy??"ok",
            //             CreatedOn = DateTime.UtcNow,
            //             ModifiedBy = student.ModifiedBy??"ok",
            //             ModifiedOn = DateTime.UtcNow,
            //             IsDeleted = false,
            //             City = student.City??"ok",
            //             DateOfBirth = student.DateOfBirth,
            //             DegreeTitle = student.DegreeTitle??"ok",
            //             Department = student.Department,
            //             EndDate = DateTime.UtcNow,
            //             Gender = student.Gender,
            //             Subject = student.Subject,
            //             RollNumber = student.RollNumber,
            //             StartDate = DateTime.UtcNow,
            //             Interest = _context.Interest.FirstOrDefault(interest => interest.ID == randomInterestId),
            //         }
            //     );
            // }
            // _context.SaveChanges();

            Random random = new Random();

            // List<string> AllDepartements = new List<string> 
            // {
            //     "Computer Science",
            //     "Software Engineering",
            //     "Information Technology",
            //     "Electrical Engineering",
            //     "Mechanical Engineering",
            //     "Civil Engineering",
            //     "Chemical Engineering",
            // };

            // List<string> AllDegrees = new List<string> 
            // {
            //     "Associate Degree",
            //     "Bachelor's Degree",
            //     "M-Phil Degree",
            //     "Post Graduate Diploma",
            //     "Doctoral Degree",
            //     "Post Doctoral"
            // };

            // List<string> Cities = new List<string> 
            // {
            //     "Lahore",
            //     "Karachi",
            //     "Islamabad",
            //     "Peshawar",
            //     "Quetta",
            //     "Multan",
            //     "Faisalabad",
            //     "Sialkot",
            //     "Gujranwala",
            //     "Sargodha",
            // };

            var li = _context.Interest.ToList();

            foreach (var stud in _context.Student.ToList())
            {
                int randomInterestId = random.Next(1, 34);
                stud.Interest = li[randomInterestId];
                _context.Student.Update(stud);
            }

            _context.SaveChanges();

            return true;
        }

        // IAppActivityRepository implementation
        public List<DailyActivityCountDto> GetDailyActivityCounts()
        {
            var endDate = DateTime.UtcNow.Date;
            var startDate = endDate.AddDays(-29); // Last 30 days

            Console.WriteLine($"Start Date: {startDate}, End Date: {endDate}");

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


        public List<DailyActivityCountDto> GetHourlyActivityCounts()
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

            var dailyActivityCounts = hourlyActivityCounts
                .GroupBy(h => h.Hour+(h.Minute/60))
                .Select(group => new DailyActivityCountDto
                {
                    Date = DateTime.UtcNow.Date.AddHours(group.Key),
                    ActionCount = group.Sum(h => h.ActionCount)
                })
                .ToList();

            return dailyActivityCounts;
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

            // Console.WriteLine($"Most Active Hours: {JsonConvert.SerializeObject(hourlyActivityCounts)}");

            // Assuming you want to return multiple most active hours in case of ties
            var mostActiveHours = hourlyActivityCounts
                .OrderByDescending(h => h.ActionCount)
                .Take(6)
                // .Where(h => h.ActionCount == hourlyActivityCounts.First().ActionCount)
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
                .OrderBy(h => h.ActionCount)
                .Take(6)
                .Select(h => FormatHour(h.Hour))
                .ToList();

            return leastActiveHours;
        }

        public List<string> GetDeadHours(int threshold = 0)
        {

            // var endDate = DateTime.UtcNow.Date;
            // var startDate = endDate.AddDays(-29); // Last 30 days

            // var hourlyActivityCountsToDelete = _context.AppActivity
            //     .Where(a => a.Timestamp.Hour >= 22 && a.Timestamp.Hour <= 8)
            //     .ToList();

            // // Remove the records from the context
            // _context.AppActivity.RemoveRange(hourlyActivityCountsToDelete);

            // // Save changes to the database
            // _context.SaveChanges();



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
                // .Where(h => h.ActionCount == threshold)
                .ToList();

            // Console.WriteLine($"Dead Active Hours: {JsonConvert.SerializeObject(hourlyActivityCounts)}");

            var deadHours = hourlyActivityCounts
                .OrderBy(h => h.ActionCount)
                .Take(6)
                .Select(h => FormatHour(h.Hour))
                .ToList();

            return deadHours;
            // return new List<string>();
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