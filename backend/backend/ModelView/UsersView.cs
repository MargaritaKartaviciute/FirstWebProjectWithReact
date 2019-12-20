using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.View
{
    public class UsersView
    {
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string DateRegistered { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Living { get; set; }
    }
}
