using Backend.Constants;

namespace Backend.Utils
{
    public class PagingInfo
    {
        private const int DefaultPageNumber = 1;
        private const int DefaultPageSize = 10;
        private const string DefaultOrderBy = "fullName"; // Provide your default value
        private const OrderDirection DefaultOrderDirection = Constants.OrderDirection.Descending; // Provide your default value

        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string? OrderBy { get; set; }
        public OrderDirection? OrderDirection { get; set; }


        public void ApplyDefaults()
        {
            PageNumber ??= DefaultPageNumber;
            PageSize ??= DefaultPageSize;
            OrderBy ??= DefaultOrderBy;
            OrderDirection ??= DefaultOrderDirection;
        }
    }
}