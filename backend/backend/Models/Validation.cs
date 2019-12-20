using backend.View;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Validation
    {
        RaskKambariokaDbContext DbContext;
        public Validation(RaskKambariokaDbContext context)
        {
            DbContext = context;
        }
        public List<string> ValidateAddOffer(AddOfferView offer)
        {
            List<string> errors = new List<string>();
            var PostUser = DbContext.Users.Where(b => b.Id == offer.Owner).FirstOrDefault();
            if (PostUser == null)
            {
                errors.Add("Vartotojas id=" + offer.Owner + " neegzistuoja");
            }
            if (offer.City == null || offer.City == "")
            {
                errors.Add("Trūksta informacijos apie miestą");
            }
            if (offer.Price<0 || offer.Price == 0)
            {
                errors.Add("Prašome nurodyti teisingą kainą");
            }
            if (offer.HeatingCost < 0 || offer.HeatingCost == 0)
            {
                errors.Add("Prašome žiemos šildymo kainą");
            }
            if (offer.SizeOfRoom < 0 || offer.SizeOfRoom == 0)
            {
                errors.Add("Prašome nurodyti teisingą kambario dydį");
            }
            if (offer.Floor < 0)
            {
                errors.Add("Blogas aukšto formatas");
            }
            if (offer.StreetAdress == null || offer.StreetAdress == "")
            {
                errors.Add("Trūksta informacijos apie gatvę");
            }
            if (offer.NumberOfRooms == 0 || offer.NumberOfRooms<0)
            {
                errors.Add("Neteisingas kambarių skaičius");
            }
            if (offer.PeopleInRoom == 0 || offer.PeopleInRoom<0)
            {
                errors.Add("Neteisingas žmonių skaičius kambaryje");
            }
            if (offer.LivingPersons != null)
            {
                if (offer.LivingPersons.Length > offer.PeopleInRoom)
                {
                    errors.Add("Pridėjote per daug žmonių!");
                }
                foreach (int id in offer.LivingPersons)
                {
                    if (DbContext.Users.Where(b => b.Id == id).FirstOrDefault() == null)
                    {
                        errors.Add("Naudotojas Id="+id+ " gyventojų sąraše neegzistuoja");
                    }
                }
            }
            return errors;
        }
        public List<string> ValidateUpdateOffer(OneOfferView offer)
        {
            List<string> errors = new List<string>();
            var PostUser = DbContext.Users.Where(b => b.Id == offer.Owner).FirstOrDefault();
            if (PostUser == null)
            {
                errors.Add("Vartotojas id=" + offer.Owner + " neegzistuoja");
            }
            if (offer.City == null || offer.City == "")
            {
                errors.Add("Trūksta informacijos apie miestą");
            }
            if (offer.StreetAdress == null || offer.StreetAdress == "")
            {
                errors.Add("Trūksta informacijos apie gatvę");
            }
            if (offer.Floor < 0)
            {
                errors.Add("Blogas aukšto formatas");
            }
            if (offer.NumberOfRooms == 0 || offer.NumberOfRooms < 0)
            {
                errors.Add("Neteisingas kambarių skaičius");
            }
            if (offer.PeopleInRoom == 0 || offer.PeopleInRoom < 0)
            {
                errors.Add("Neteisingas žmonių skaičius kambaryje");
            }
            if (offer.Price < 0 || offer.Price == 0)
            {
                errors.Add("Prašome nurodyti teisingą kainą");
            }
            if (offer.SizeOfRoom < 0 || offer.SizeOfRoom == 0)
            {
                errors.Add("Prašome nurodyti teisingą kambario dydį");
            }
            if (offer.HeatingCost < 0 || offer.HeatingCost == 0)
            {
                errors.Add("Prašome žiemos šildymo kainą");
            }
            if (offer.LivingPersons.Length > offer.PeopleInRoom)
            {
                errors.Add("Pridėjote per daug žmonių!");
            }
            return errors;
        }
        public List<string> ValidateEndorse(Endorse endorse)
        {
            List<string> errors = new List<string>();
            if (endorse.SkillName == "")
            {
                errors.Add("Prašome įvesti apibūdinimo pavadinimą");
            }
            if (!DbContext.Users.Any(u => u.Id == endorse.UserId))
            {
                errors.Add("Naudotojas nerastas");
            }
            if (DbContext.Endorses.Any(e => e.EndorserId == endorse.EndorserId && e.SkillName == endorse.SkillName && e.UserId == endorse.UserId))
            {
                errors.Add("Naudotojas jau įvertino " + endorse.SkillName);
            }
            return errors;
        }
        public List<string> ValidateUserUpdate(User user, ClaimsPrincipal User)
        {
            List<string> errors = new List<string>();
            int x = Int32.Parse(User.Identity.Name);
            if (x != user.Id)
            {
                errors.Add("Bandoma modifikuoti kito naudotojo profilį");
            }
            var foo = new EmailAddressAttribute();
            if (!foo.IsValid(user.Email))
            {
                errors.Add("Prašome patikrinti el. paštą");
            }
            if (user.PhoneNumber != null && user.PhoneNumber.Length > 15)
            {
                errors.Add("Telefono numeris yra per ilgas");
            }
            if (user.FirstName != null && user.FirstName.Length > 25)
            {
                errors.Add("Vardas per ilgas");
            }
            if (user.LastName != null && user.LastName.Length > 25)
            {
                errors.Add("Pavardė per ilga");
            }
            if (user.Gender == null)
            {
                errors.Add("Prašome nurodyti lytį");
            }
            return errors;
        }
    }
}
