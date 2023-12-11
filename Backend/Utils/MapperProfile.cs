using AutoMapper;
using Backend.Dtos;
using Backend.Model;

namespace Backend.Utils
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Student, AddUpdateStudentDto>().ReverseMap();
            
            CreateMap<Constants.Gender, bool>()
                .ConvertUsing(gender => gender == Constants.Gender.Male);

            CreateMap<string, Interest>()
                .ConstructUsing(interestName => new Interest { Name = interestName });
        
            CreateMap<Interest, string>()
                .ConvertUsing(interest => interest.Name);
        }
    }
}

/*
{
    "fullName": "kamran",
    "rollNumber": "bcsf19m030",
    "email": "bcsf19m030@pucit.edu.pk",
    "gender": 1,
    "dateOfBirth": "2002-07-18",
    "city": "lahore",
    "interest": "Book Reading",
    "department": "Computer Science",
    "degreeTitle": "Bachelor's Degree",
    "subject": "Computer",
    "startDate": "2023-12-11",
    "endDate": "2024-02-11"
}
*/