using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class RaskKambariokaDbContext : DbContext
    {
        public RaskKambariokaDbContext(DbContextOptions<RaskKambariokaDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<OffersPhoto> OfferPhotos { get; set; }
        public DbSet<Endorse> Endorses { get; set; }
        public DbSet<LivingPerson> LivingPersons { get; set; }
    }
}
