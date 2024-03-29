
using AutoMapper;
using Backend.Model;
using Backend.Utils;

namespace Backend.Repositories.InterestRepo
{
    public class InterestRepository : IInterestRepository
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public InterestRepository(AppDbContext context, IMapper map)
        {
            _context = context;
            _mapper = map;
        }



        // IInterestRepository implementation
        public Interest GetInterestByName(string name)
        {
            return _context.Interest.FirstOrDefault(x => x.Name == name);
        }

        public List<string> GetTop5Interests()
        {

            var top5Interests = _context.Student
                .GroupBy(s => s.Interest)
                .Select(g => new
                {
                    Interest = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(i => i.Count)
                .Take(5)
                .Select(i => i.Interest)
                .ToList();

            return top5Interests.Select(i => i.Name).ToList();
        }

        public List<string> GetBottom5Interests()
        {
            var bottom5Interests = _context.Student
                .GroupBy(s => s.Interest)
                .Select(g => new
                {
                    Interest = g.Key,
                    Count = g.Count()
                })
                .OrderBy(i => i.Count)
                .Take(5)
                .Select(i => i.Interest)
                .ToList();

            return bottom5Interests.Select(i => i.Name).ToList();
        }

        public int GetUniqueInterestsCount()
        {
            var uniqueInterestsCount = _context.Interest
                .Select(s => s.Name)
                .Distinct()
                .Count();

            return uniqueInterestsCount;
        }


        // IRepository implementation

        public Interest Get(long id)
        {
            return _context.Interest.Find(id);
        }

        public IEnumerable<Interest> Get()
        {
            return _context.Interest.ToList();
        }

        public Interest Save(Interest dto)
        {

            var interest = _mapper.Map<Interest>(dto);
            _context.Interest.Add(interest);
            _context.SaveChanges();
            return interest;
        }
        
        
        public bool Delete(long id)
        {
            throw new NotImplementedException();
        }

        public PagedList<Interest> Page(Predicate<Interest> criteria, PagingInfo pagingInfo)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Interest> Search(Predicate<Interest> criteria)
        {
            throw new NotImplementedException();
        }

        public Interest Update(Interest dto)
        {
            throw new NotImplementedException();
        }


    }
}