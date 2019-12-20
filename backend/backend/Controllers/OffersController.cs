using backend.Models;
using backend.View;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class OffersController : Controller
    {
        Validation validation;
        RaskKambariokaDbContext DbContext;
        public OffersController(RaskKambariokaDbContext DbContext)
        {
            this.DbContext = DbContext;
            validation = new Validation(DbContext);
        }
        // GET api/<controller>/5
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            try
            {
                var offer = DbContext.Offers.Where(b => b.Id == id).FirstOrDefault();
                if (offer == null)
                {
                    return NotFound("Pasiūlymas id=" + id.ToString() + " neegzistuoja");
                }
                var user = DbContext.Users.Where(b => b.Id == offer.OwnerId).FirstOrDefault();
                var livingPeople = DbContext.LivingPersons.Where(b => b.OfferId == id).ToArray();
                List<LivingPersonView> AllLivingPersons = new List<LivingPersonView>();
                if (livingPeople.Length != 0)
                {
                    foreach (LivingPerson onePerson in livingPeople)
                    {
                        var personData = DbContext.Users.Where(b => b.Id == onePerson.UserId).FirstOrDefault();
                        LivingPersonView person = new LivingPersonView()
                        {
                            id = onePerson.UserId,
                            FirstName = personData.FirstName,
                            LastName = personData.LastName
                        };
                        AllLivingPersons.Add(person);
                    }
                }
                OneOfferView one = new OneOfferView
                {
                    Id = id,
                    Owner = offer.OwnerId,
                    City = offer.City,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    StreetAdress = offer.StreetAdress,
                    Photos = DbContext.OfferPhotos.Where(b => b.OfferId == id).Select(a => a.PhotoContent).ToArray(),
                    Floor = offer.Floor,
                    NumberOfRooms = offer.NumberOfRooms,
                    PeopleInRoom = offer.PeopleInRoom,
                    HasBalcony = offer.HasBalcony,
                    PetsAllowed = offer.PetsAllowed,
                    Price = offer.Price,
                    Lat = offer.Lat,
                    Lng = offer.Lng,
                    LivingPersons = AllLivingPersons.ToArray(),
                    AirConditioner = offer.AirConditioner,
                    CarPlace = offer.CarPlace,
                    Description = offer.Description,
                    HeatingCost = offer.HeatingCost,
                    SizeOfRoom = offer.SizeOfRoom
                };
                return Ok(one);
            }
            catch
            {
                return BadRequest("Deja, pasiūlymo gauti nepavyko");
            }
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get([FromQuery] int? userid)
        {
            try
            {
                List<AllOffersView> allOffersView = new List<AllOffersView>();

                if (userid != null)
                {
                    foreach (Offer one in DbContext.Offers.ToArray())
                    {
                        if (userid == one.OwnerId)
                        {
                            var livingPeople = DbContext.LivingPersons.Where(b => b.OfferId == one.Id).ToArray();
                            List<LivingPersonView> AllLivingPersons = new List<LivingPersonView>();
                            if (livingPeople.Length != 0)
                            {
                                foreach (LivingPerson onePerson in livingPeople)
                                {
                                    var personData = DbContext.Users.Where(b => b.Id == onePerson.UserId).FirstOrDefault();
                                    LivingPersonView person = new LivingPersonView()
                                    {
                                        id = onePerson.UserId,
                                        FirstName = personData.FirstName,
                                        LastName = personData.LastName
                                    };
                                    AllLivingPersons.Add(person);
                                }
                            }
                            AllOffersView x = new AllOffersView
                            {
                                Id = one.Id,
                                City = one.City,
                                StreetAdress = one.StreetAdress,
                                Photo = DbContext.OfferPhotos.Where(b => b.OfferId == one.Id).Select(a => a.PhotoContent).FirstOrDefault(),
                                Floor = one.Floor,
                                Price = one.Price,
                                Lng = one.Lng,
                                Lat = one.Lat,
                                Description = one.Description,
                                NumberOfRooms = one.NumberOfRooms,
                                SizeOfRoom = one.SizeOfRoom,
                                HeatingCost = one.HeatingCost,
                                CarPlace = one.CarPlace,
                                AirConditioner = one.AirConditioner,
                                HasBalcony = one.HasBalcony,
                                PetsAllowed = one.PetsAllowed,
                                PeopleInRoom = one.PeopleInRoom,
                                LivingPersons = AllLivingPersons

                            };
                            allOffersView.Add(x);
                        }
                    }
                    return Ok(allOffersView);
                }
                else
                {
                    foreach (Offer one in DbContext.Offers.ToArray())
                    {
                        var livingPeople = DbContext.LivingPersons.Where(b => b.OfferId == one.Id).ToArray();
                        List<LivingPersonView> AllLivingPersons = new List<LivingPersonView>();
                        if (livingPeople.Length != 0)
                        {
                            foreach (LivingPerson onePerson in livingPeople)
                            {
                                var personData = DbContext.Users.Where(b => b.Id == onePerson.UserId).FirstOrDefault();
                                LivingPersonView person = new LivingPersonView()
                                {
                                    id = onePerson.UserId,
                                    FirstName = personData.FirstName,
                                    LastName = personData.LastName
                                };
                                AllLivingPersons.Add(person);
                            }
                        }
                        AllOffersView x = new AllOffersView
                        {
                            Id = one.Id,
                            City = one.City,
                            StreetAdress = one.StreetAdress,
                            Photo = DbContext.OfferPhotos.Where(b => b.OfferId == one.Id).Select(a => a.PhotoContent).FirstOrDefault(),
                            Floor = one.Floor,
                            Price = one.Price,
                            Lng = one.Lng,
                            Lat = one.Lat,
                            Description = one.Description,
                            NumberOfRooms = one.NumberOfRooms,
                            SizeOfRoom = one.SizeOfRoom,
                            HeatingCost = one.HeatingCost,
                            CarPlace = one.CarPlace,
                            AirConditioner = one.AirConditioner,
                            HasBalcony = one.HasBalcony,
                            PetsAllowed = one.PetsAllowed,
                            PeopleInRoom = one.PeopleInRoom,
                            LivingPersons = AllLivingPersons

                        };
                        allOffersView.Add(x);
                    }
                    return Ok(allOffersView);
                }
            }
            catch
            {
                return BadRequest("Deja, pasiūlymų gauti nepavyko");
            }
        }
        // POST api/<controller>
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody]AddOfferView offer)
        {
            try
            {
                List<string> errors = validation.ValidateAddOffer(offer);
                if (errors.Count != 0)
                {
                    return BadRequest(errors);
                }
                var user = DbContext.Users.Where(b => b.Id == offer.Owner).FirstOrDefault();
                Offer one = new Offer()
                {
                    Owner = user,
                    OwnerId = user.Id,
                    City = offer.City,
                    StreetAdress = offer.StreetAdress,
                    Floor = offer.Floor,
                    NumberOfRooms = offer.NumberOfRooms,
                    PeopleInRoom = offer.PeopleInRoom,
                    HasBalcony = offer.HasBalcony,
                    PetsAllowed = offer.PetsAllowed,
                    Price = offer.Price,
                    Lat = offer.Lat,
                    Lng = offer.Lng,
                    Description = offer.Description,
                    SizeOfRoom = offer.SizeOfRoom,
                    HeatingCost = offer.HeatingCost,
                    CarPlace = offer.CarPlace,
                    AirConditioner = offer.AirConditioner
                };
                DbContext.Offers.Add(one);
                DbContext.SaveChanges();
                Offer added = DbContext.Offers.Where(b => b.Owner.Id == offer.Owner).Last();
                foreach (string photo in offer.Photos)
                {
                    OffersPhoto photoOfOrder = new OffersPhoto() { Offer = added, PhotoContent = photo };
                    DbContext.OfferPhotos.Add(photoOfOrder);
                }
                DbContext.SaveChanges();
                if (offer.LivingPersons != null)
                {
                    foreach (int id in offer.LivingPersons)
                    {
                        LivingPerson person = new LivingPerson()
                        {
                            UserId = id,
                            OfferId = added.Id
                        };
                        DbContext.LivingPersons.Add(person);
                    }
                }
                DbContext.SaveChanges();
                return Ok(offer);
            }
            catch
            {
                return BadRequest("Deja, pasiūlymo įterpti nepavyko");
            }
        }
        [HttpDelete]
        [Authorize]
        public IActionResult Delete([FromQuery]int id)
        {
            try
            {
                if (id < 0)
                    return BadRequest("Neteisingas naudotojo id");

                var offer = DbContext.Offers.Where(o => o.Id == id).SingleOrDefault();
                if (offer == null)
                    return NotFound("Pasiūlymas id=" + id.ToString() + " neegzistuoja");

                var photoIDs = DbContext.OfferPhotos.Where(p => p.OfferId == id).ToList();
                foreach (var i in photoIDs)
                {
                    DbContext.OfferPhotos.Remove(i);
                }
                var livingPeople = DbContext.LivingPersons.Where(p => p.OfferId == id).ToList();
                foreach (var i in livingPeople)
                {
                    DbContext.LivingPersons.Remove(i);
                }
                DbContext.Offers.Remove(offer);
                DbContext.SaveChanges();
                return Ok("Deleted id=" + id);
            }
            catch
            {
                return BadRequest("Deja, pasiūlymo ištrinti nepavyko");
            }
        }
        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody]OneOfferView offer)
        {
            try
            {
                List<string> errors = validation.ValidateUpdateOffer(offer);
                if (errors.Count != 0)
                {
                    return BadRequest(errors);
                }
                int x = Int32.Parse(User.Identity.Name);
                if (x != offer.Owner) return BadRequest("Bandoma redaguoti kitą pasiūlymą");
                var one = DbContext.Offers.SingleOrDefault(p => p.Id == offer.Id);
                one.City = offer.City;
                one.StreetAdress = offer.StreetAdress;
                one.Floor = offer.Floor;
                one.NumberOfRooms = offer.NumberOfRooms;
                one.PeopleInRoom = offer.PeopleInRoom;
                one.HasBalcony = offer.HasBalcony;
                one.PetsAllowed = offer.PetsAllowed;
                one.Price = offer.Price;
                one.Lat = offer.Lat;
                one.Lng = offer.Lng;
                one.Description = offer.Description;
                one.SizeOfRoom = offer.SizeOfRoom;
                one.HeatingCost = offer.HeatingCost;
                one.CarPlace = offer.CarPlace;
                one.AirConditioner = offer.AirConditioner;


                var photos = DbContext.OfferPhotos.Where(p => p.OfferId == offer.Id).ToList();
                foreach (var i in photos)
                {
                    DbContext.OfferPhotos.Remove(i);
                }
                foreach (var i in offer.Photos)
                {
                    DbContext.OfferPhotos.Add(new OffersPhoto
                    {
                        Offer = one,
                        OfferId = one.Id,
                        PhotoContent = i
                    });
                }
                var people = DbContext.LivingPersons.Where(p => p.OfferId == offer.Id).ToList();
                foreach (var i in people)
                {
                    DbContext.LivingPersons.Remove(i);
                }
                if (offer.LivingPersons.Length > offer.PeopleInRoom)
                {
                    return BadRequest("Negalima pridėti daugiau žmonių, nei telpa kambaryje");
                }

                foreach (var i in offer.LivingPersons)
                {

                    DbContext.LivingPersons.Add(new LivingPerson
                    {
                        Offer = one,
                        OfferId = one.Id,
                        User = DbContext.Users.SingleOrDefault(p => p.Id == i.id),
                        UserId = i.id
                    });
                }
                DbContext.SaveChanges();
                return Ok(offer);
            }
            catch
            {
                return BadRequest("Deja, pasiūlymo atnaujinti nepavyko");
            }
        }
        [HttpPost("mail")]
        [Authorize]
        public IActionResult Post([FromBody]Mail mailData)
        {
            try
            {
                var offer = DbContext.Offers.Where(b => b.Id == mailData.OfferId).FirstOrDefault();
                if (offer == null)
                {
                    return BadRequest("Toks pasiūlymas neegzistuoja");
                }
                var user = DbContext.Users.Where(b => b.Id == Int32.Parse(User.Identity.Name)).FirstOrDefault();
                var owner = DbContext.Users.Where(b => b.Id == offer.OwnerId).FirstOrDefault();
                string ad = "<br>--\nIeškai Kambario draugo?<br> O gal nusibodo senasis, nori išsikraustyti ir užleisti vietą kitam?\nUžsuk pas mus ir rasi tai ko reikia!\n<a href=\"http://localhost:3000/offers\">Apsilankyti</a>\nRask Kambarioka komanda";
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Rask kambarioka", "raskambarioka@gmail.com"));
                message.To.Add(new MailboxAddress(owner.FirstName, owner.Email));
                message.Subject = user.FirstName + " " + user.LastName + " nori su tavimi susisiekti";
                message.Body = new TextPart("Html")
                {
                    Text = "<div><font size=" + 4 + ">"
                              + mailData.Message.Replace("\n", "<br>") + "<br>" +
                    "Skelbimas:<br> <a href=\"http://localhost:3000/offers/" +
                    mailData.OfferId + "\">Peržiūrėti pasiūlymą</a>" +
                    "<br>Susidomėjusio profilis:</a><br><a><a href=\"http://localhost:3000/profile/" +
                    user.Id + "\">Peržiūrėti profilį</a>" + ad.Replace("\n", "<br>") + "</font></div>"
                };
                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate("raskambarioka@gmail.com", "nesaugusslaptazodis");
                    client.Send(message);
                    client.Disconnect(true);
                }
                return Ok();
            }
            catch
            {
                return BadRequest("Deja, užklausos išsiūsti nepavyko");
            }
        }
    }
}

