

using Backend.Interfaces;
using Backend.Model;

namespace Backend.Repositories.InterestRepo
{
    public interface IInterestRepository : IRepository<Interest>
    {
        Interest GetInterestByName(string name);
    }
}