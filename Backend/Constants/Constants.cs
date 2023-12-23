
namespace Backend.Constants
{
    public enum OrderDirection
    {
        Ascending,
        Descending
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


    public static class Constants
    {
        public const int DefaultPageSize = 10;
        public const int DefaultPageNumber = 1;
        public const OrderDirection DefaultOrderDirection = OrderDirection.Ascending;
        public const OrderBy DefaultOrderBy = OrderBy.Id;
        
        public const string ADMIN = "ADMIN";
        public const string SUB_ADMIN = "SUB_ADMIN";
        public const string STUDENT = "STUDENT";
        public const string DISMISSED = "Dismissed";



        public static List<string> AllDepartements = new List<string> 
        {
            "Computer Science",
            "Software Engineering",
            "Information Technology",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Chemical Engineering",
        };

        public static List<string> AllDegrees = new List<string> 
        {
            "Associate Degree",
            "Bachelor's Degree",
            "M-Phil Degree",
            "Post Graduate Diploma",
            "Doctoral Degree",
            "Post Doctoral"
        };
        
    }
}