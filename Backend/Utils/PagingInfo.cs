using Backend.Constants;

namespace Backend.Utils
{
    public class PagingInfo
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
        public OrderDirection OrderDirection { get; set; }
    }
}