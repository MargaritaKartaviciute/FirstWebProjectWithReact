using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Endorse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int EndorserId { get; set; }
        public User Endorser { get; set; }
        public string SkillName { get; set; }
    }
}
