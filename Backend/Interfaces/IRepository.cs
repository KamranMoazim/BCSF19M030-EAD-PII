using Backend.Model.HelpingModels;
using Backend.Utils;

namespace Backend.Interfaces
{
    // public interface IRepository<T> where T: AuditInfo
    public interface IRepository<T> where T: Identity
    {
        T Save(T dto);
        T Update(T dto);
        bool Delete(long id);
        T Get(long id);
        IEnumerable<T> Get();
        IEnumerable<T> Search(Predicate<T> criteria);
        PagedList<T> Page(Predicate<T> criteria, PagingInfo pagingInfo);
    }
}