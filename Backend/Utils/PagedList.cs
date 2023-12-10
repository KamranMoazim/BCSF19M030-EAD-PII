

using Backend.Model.HelpingModels;

namespace Backend.Utils
{
    public class PagedList<T> where T : AuditInfo
    {
        public IEnumerable<T> Source { get; }
        public int NumberOfRows { get; }
        public int NumberOfPages { get; }

        public PagedList(IEnumerable<T> source, int numOfRows, int pageSize)
        {
            Source = source;
            NumberOfRows = numOfRows;
            NumberOfPages = numOfRows / pageSize <= 0 ? 1 : pageSize;
        }
    }
}