using Backend.Model.HelpingModels;

namespace Backend.Model
{
    public class AppActivity : Identity
    {

        /*
        Activity means everything that user does, such as 
            • logging in/out the system
            • going to a screen
            • changing page size
            • clicking back/next button on page navigator
            • adding/editing/viewing/deleting a record
            • doing any type of operation on the system
        */

        // public string Name { get; set; }
        // public string Type { get; set; }
        // public string Url { get; set; }


        // User-related information
        public string UserId { get; set; } // Assuming you're using Identity and this is the user's ID
        public string UserName { get; set; } // Assuming you want to store the user's name

        // Activity details
        public string Action { get; set; } // Describes the action the user performed (e.g., "Login", "ViewRecord", "EditRecord")
        public string Target { get; set; } // Describes the target of the action (e.g., "Screen", "RecordType")
        public string Details { get; set; } // Additional details about the activity

        // Timestamp
        public DateTime Timestamp { get; set; } // When the activity occurred
    }
}