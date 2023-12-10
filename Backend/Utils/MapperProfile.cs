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
        }
    }
}