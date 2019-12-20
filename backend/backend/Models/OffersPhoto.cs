using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class OffersPhoto
    {
        public int Id { get; set; }
        public Offer Offer { get; set; }
        public int OfferId { get; set; }
        public String PhotoContent { get; set; }
    }
}
