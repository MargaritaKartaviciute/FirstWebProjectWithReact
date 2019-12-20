using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/Endorses")]
    public class EndorsesController : Controller
    {
        Validation validation;
        private readonly RaskKambariokaDbContext _context;

        public EndorsesController(RaskKambariokaDbContext context)
        {
            _context = context;
            validation = new Validation(context);
        }

        // POST: api/Endorses
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody]Endorse endorse)
        {
            try
            {
                List<string> errors = validation.ValidateEndorse(endorse);
                if (errors.Count != 0)
                {
                    return BadRequest(errors);
                }
                if (Int32.Parse(User.Identity.Name) == endorse.UserId && endorse.UserId == endorse.EndorserId && endorse.SkillName != "")
                {
                    _context.Endorses.Add(endorse);
                    _context.SaveChanges();
                    return Ok("Pridėtas apibūdinimas savininkui");
                }
                if (!_context.Users.Any(u => u.Id == endorse.EndorserId))
                {
                    return NotFound("Apibūdinimas nerastas");
                }
                _context.Endorses.Add(endorse);
                _context.SaveChanges();

                return Created("GetEndorse", endorse);
            }
            catch
            {
                return BadRequest("Deja, įterpti nepavyko");
            }
        }
        [HttpDelete]
        [Authorize]
        public IActionResult Delete(Endorse endorse)
        {
            try
            {
                List<Endorse> all = _context.Endorses.Where(b => b.UserId == endorse.UserId && b.SkillName == endorse.SkillName).ToList();
                if (Int32.Parse(User.Identity.Name) == endorse.UserId && endorse.UserId == endorse.EndorserId && endorse.SkillName != "")
                {
                    foreach (Endorse one in all)
                    {
                        _context.Endorses.Remove(one);
                    }
                    _context.SaveChanges();
                    return Ok("Apibūdinimas ištrintas");
                }
                if (all.Count == 0)
                {
                    return NotFound("Apibūdinimas nerastas");
                }
                _context.Endorses.Remove(all.Where(b => b.EndorserId == endorse.EndorserId && b.SkillName == endorse.SkillName && b.UserId == endorse.UserId).FirstOrDefault());
                _context.SaveChanges();

                return Ok("Deleted");
            }
            catch
            {
                return BadRequest("Ištrinti nepavyko");
            }
        }
    }
}