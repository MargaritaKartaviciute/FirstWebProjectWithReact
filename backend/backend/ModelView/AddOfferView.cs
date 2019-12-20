using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.View
{
    public class AddOfferView
    {
        public int Owner { get; set; }
        public string City { get; set; }
        public string StreetAdress { get; set; }
        public string[] Photos { get; set; }
        public int Floor { get; set; }
        public int NumberOfRooms { get; set; }
        public int PeopleInRoom { get; set; }
        public bool HasBalcony { get; set; }
        public bool PetsAllowed { get; set; }
        public double Price { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public int[] LivingPersons { get; set; }
        public string Description { get; set; }
        public double SizeOfRoom { get; set; }
        public double HeatingCost { get; set; }
        public bool CarPlace { get; set; }
        public bool AirConditioner { get; set; }
    }
}
