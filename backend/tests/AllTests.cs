using backend.Controllers;
using backend.Models;
using backend.View;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace tests
{
    public class AllTests
    {
        public static RaskKambariokaDbContext context = GetContextWithData();
        [Fact]
        public void AddOffer()
        {
            var OfferController = new OffersController(context);
            AddOfferView[] offers = new AddOfferView[]
            {
                new AddOfferView{Owner = 1, City = "Kaunas", Floor = 2, HasBalcony = true, NumberOfRooms = 1, Price = 125.2, PetsAllowed = false, StreetAdress = "pasiles 39-1212", PeopleInRoom = 3, Photos = new string[] { "one", "two", "three" }, LivingPersons = new int[] { 2 }, AirConditioner=true, CarPlace=false, Description="asd", HeatingCost=123, Lat="111", Lng="2", SizeOfRoom=12.5 },
                new AddOfferView{Owner = 1, City = "Kaunas", HasBalcony = true, NumberOfRooms = 1, Price = 125.2, PetsAllowed = false, StreetAdress = "pasiles 39-1212", PeopleInRoom = 3, Photos = new string[] { "one", "two", "three" }, LivingPersons = new int[] { 1, 2, 3 }, AirConditioner=true, CarPlace=false, Description="asd", HeatingCost=123, Lat="111", Lng="2", SizeOfRoom=12.5 },
                new AddOfferView{Owner = 3, City = "Vilnius", Floor = 2, HasBalcony = true, NumberOfRooms = 1, Price = 125.2, PetsAllowed = false, StreetAdress = "pasiles 39-1212", PeopleInRoom = 3, Photos = new string[] { "one", "two", "three" }, LivingPersons = new int[] { 1, 2, 3 }, AirConditioner=true, CarPlace=false, Description="asd", HeatingCost=123, Lat="111", Lng="2", SizeOfRoom=12.5 },
                new AddOfferView{Owner = 1, City = "Kaunas", Floor = 2, HasBalcony = true, NumberOfRooms = 1, Price = 125.2, PetsAllowed = false, StreetAdress = "pasiles 39-1212", PeopleInRoom = 3, Photos = new string[] { "one", "two", "three" },  AirConditioner=true, CarPlace=false, Description="asd", HeatingCost=123, Lat="111", Lng="2", SizeOfRoom=12.5 },
                new AddOfferView{Owner=2, City = "Kaunas", Floor = 2, HasBalcony = true, NumberOfRooms = 1, Price = 125.2, PetsAllowed = false, StreetAdress = "pasiles 39-1212", PeopleInRoom = 3, Photos = new string[] { "one", "two", "three" }, LivingPersons = new int[] { 1, 2 },  AirConditioner=true, CarPlace=false, Description="asd", HeatingCost=123, Lat="111", Lng=null, SizeOfRoom=12.5 },
                new AddOfferView{City = "Kaunas", Floor = 2, HasBalcony = true, NumberOfRooms = 1, Price = 125.2, PetsAllowed = false, StreetAdress = "pasiles 39-1212", PeopleInRoom = 3, Photos = new string[] { "one", "two", "three" }, LivingPersons = new int[] { 1, 2 },  AirConditioner=true, CarPlace=false, Description="asd", HeatingCost=123, Lat="111", Lng=null },
                new AddOfferView{Owner=2, Floor = 2, HasBalcony = true, NumberOfRooms = 1, Price = 125.2, PetsAllowed = false, StreetAdress = "pasiles 39-1212", PeopleInRoom = 3, Photos = new string[] { "one", "two", "three" } }
            };
            foreach (AddOfferView one in offers)
            {
                OfferController.Post(one);
            }
            Assert.Equal(3, context.Offers.ToList().Count);
        }
        private static RaskKambariokaDbContext GetContextWithData()
        {
            var options = new DbContextOptionsBuilder<RaskKambariokaDbContext>()
                              .UseInMemoryDatabase(Guid.NewGuid().ToString())
                              .Options;
            var context = new RaskKambariokaDbContext(options);

            User newUser = new User { Id = 1, FirstName = "Aivaras", LastName = "Augustinas", Email = "aivaras" };
            User newUser1 = new User { Id=2, FirstName = "Matas", LastName = "Grišius", Email = "matas" };
            context.Users.Add(newUser);
            context.Users.Add(newUser1);
            context.SaveChanges();

            return context;
        }

        [Fact]
        public void GetOfferTest()
        {
            var OfferController = new OffersController(context);
            int count = 0;
            for(int i=0;i<10;i++)
            {
                IActionResult result = OfferController.Get(i);
                var okObjectResult = result as OkObjectResult;
                if (okObjectResult != null)
                {
                    count++;
                }
            }
            Assert.Equal(3, count);
        }
    }
}
