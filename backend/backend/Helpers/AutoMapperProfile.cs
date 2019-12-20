using AutoMapper;
using backend.Models;

namespace backend.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserData>();
            CreateMap<UserData, User>();
        } 
    }
}
