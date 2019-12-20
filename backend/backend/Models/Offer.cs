using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public User Owner { get; set; }
        public int OwnerId { get; set; }
        [Required]
        [StringLength(40, ErrorMessage = "City name cannot be longer than 40 characters.")]
        public string City { get; set; }
        [Required]
        [StringLength(200, ErrorMessage = "Street address name cannot be longer than 200 characters.")]
        public string StreetAdress { get; set; }
        public int Floor { get; set; }
        public int NumberOfRooms { get; set; }
        public int PeopleInRoom { get; set; }
        public bool HasBalcony { get; set; }
        public bool PetsAllowed { get; set; }
        [Required]
        public double Price { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public string Description { get; set; }
        public double SizeOfRoom { get; set; }
        public double HeatingCost { get; set; }
        public bool CarPlace { get; set; }
        public bool AirConditioner { get; set; }
    }
}
