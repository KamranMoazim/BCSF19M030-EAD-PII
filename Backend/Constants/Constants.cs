
namespace Backend.Constants
{
    public enum OrderDirection
    {
        Asc,
        Desc
    }


    public enum OrderBy
    {
        Id,
        Name,
        CreatedOn,
        ModifiedOn
    }


    public enum AppActions
    {
        Create,
        Update,
        Delete,
        Read,
        ReadAll,
        ReadAllWithPagination,
        ReadAllWithPaginationAndOrder,
        ReadAllWithOrder,
        ReadAllWithOrderAndPagination,
        ChangedPageSize,
        ChangedPageNumber,
        ChangedOrderDirection,
        ChangedOrderBy,
        GoToNextPage,
        GoToPreviousPage,
        GoToFirstPage,
        GoToLastPage,
        
    }



    public enum Gender
    {
        Female = 0,
        Male = 1
    }
}