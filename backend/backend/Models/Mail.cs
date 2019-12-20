using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Mail
    {
        public int OfferId { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
    }
}
