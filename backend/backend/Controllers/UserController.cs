using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.View;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        RaskKambariokaDbContext DbContext;
        Validation validation;
        public UserController(RaskKambariokaDbContext context)
        {
            DbContext = context;
            validation = new Validation(DbContext);
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<UsersView> allUsers = new List<UsersView>();
                var users = DbContext.Users.ToArray();
                if (users.Length == 0)
                {
                    return NotFound();
                }
                var livingPeople = DbContext.LivingPersons;
                foreach (User one in users)
                {
                    UsersView user = new UsersView()
                    {
                        id = one.Id,
                        FirstName = one.FirstName,
                        LastName = one.LastName,
                        Description = one.Description,
                        DateRegistered = one.DateRegistered,
                        Email = one.Email,
                        PhoneNumber = one.PhoneNumber,
                        Living = livingPeople.Where(e => e.UserId == one.Id).Count() > 0
                    };
                    allUsers.Add(user);
                }
                return Ok(allUsers.ToArray());
            }
            catch
            {
                return BadRequest("Deja, visų vartotojų gauti nepavyko");
            }
        }

        [HttpGet("photo/{id}")]
        [Authorize]
        public IActionResult GetPhoto([FromRoute] int id)
        {
            try
            {
                var user = DbContext.Users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    return NotFound("Naudotojo id=" + id + " neegzistuoja");
                }
                if (Int32.Parse(User.Identity.Name) != user.Id)
                {
                    return BadRequest("Blogas naudotojo id");
                }
                return Ok(user.avatarPhoto);
            }
            catch
            {
                return BadRequest("Deja, fotografijos gauti nepavyko");
            }
        }


        [HttpGet("withEndorses/{id}")]
        [Authorize]
        public IActionResult GetWithEndorses([FromRoute] int id, int? endorserId)
        {
            try
            {
                var user = DbContext.Users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    return NotFound("Naudotojo id=" + id + " neeegzistuoja");
                }
                var endorses = DbContext.Endorses
                    .Where(e => e.UserId == id)
                    .GroupBy(e => e.SkillName)
                    .Select(group => new EndorsedSkillsView
                    {
                        SkillName = group.Key,
                        Count = group.Count(),
                        CanEndorse = group.All(e => e.EndorserId != endorserId)
                    })
                    .OrderBy(skillsView => skillsView.Count)
                    .ThenBy(skillsview => skillsview.SkillName)
                    .ToList();
                return Ok(new UserView
                {
                    Id = user.Id,
                    BirthDay = user.BirthDay,
                    Degree = user.Degree,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    Gender = user.Gender,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    School = user.School,
                    Work = user.Work,
                    EndorsedSkills = endorses.ToArray(),
                    AvatarPhoto = user.avatarPhoto,
                    Description = user.Description
                });
            }
            catch
            {
                return BadRequest("Deja, nepavyko gauti informacijos apie vartotoją");
            }
        }

        // PUT api/<controller>
        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody]User user)
        {
            try
            {
                List<string> errors = validation.ValidateUserUpdate(user, User);
                if (errors.Count != 0)
                {
                    return BadRequest(errors);
                }
                DbContext.Users.Attach(user);
                DbContext.Entry(user).Property(b => b.FirstName).IsModified = true;
                DbContext.Entry(user).Property(b => b.LastName).IsModified = true;
                DbContext.Entry(user).Property(b => b.Email).IsModified = true;
                DbContext.Entry(user).Property(b => b.avatarPhoto).IsModified = true;
                DbContext.Entry(user).Property(b => b.PhoneNumber).IsModified = true;
                DbContext.Entry(user).Property(b => b.BirthDay).IsModified = true;
                DbContext.Entry(user).Property(b => b.Gender).IsModified = true;
                DbContext.Entry(user).Property(b => b.Degree).IsModified = true;
                DbContext.Entry(user).Property(b => b.Work).IsModified = true;
                DbContext.Entry(user).Property(b => b.School).IsModified = true;
                DbContext.Entry(user).Property(b => b.Description).IsModified = true;
                DbContext.SaveChanges();
                return Ok(user);
            }
            catch
            {
                return BadRequest("Deja, vartotojo informacijos atnaujinti nepavyko");
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            try
            {
                if (DbContext.Users.Where(b => b.Id == id).ToList().Count == 0)
                {
                    return NotFound("Naudotojo id=" + id.ToString() + " neegzistuoja");
                }
                if (DbContext.Offers.Where(b => b.Owner.Id == id).ToList().Count > 0)
                {
                    return Forbid("Naudotojas id=" + id.ToString() + " turi pasiūlymų, pirmiausia ištrinkite visus pasiūlymus");
                }
                User deletableUser = DbContext.Users.FirstOrDefault(c => c.Id == id);
                DbContext.Users.Remove(deletableUser);
                DbContext.SaveChanges();
                return Ok(deletableUser);
            }
            catch
            {
                return BadRequest("Deja, vartotojo ištrinti nepavyko");
            }
        }
    }
}
