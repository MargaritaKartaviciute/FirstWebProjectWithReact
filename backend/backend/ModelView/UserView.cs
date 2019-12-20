using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.View
{
    public class UserView
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDay { get; set; }
        public String Gender { get; set; }
        public String Degree { get; set; }
        public String Work { get; set; }
        public String School { get; set; }
        public EndorsedSkillsView[] EndorsedSkills { get; set; }
        public string AvatarPhoto { get; set; }
        public string Description { get; set; }
    }
}
