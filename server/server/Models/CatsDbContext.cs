using Bagheeras.Dream.Data.Models;
using Microsoft.EntityFrameworkCore;
using server.Models.Cats;
using server.Models.PublicPets;

namespace server.Models
{
    public class CatsDbContext : DbContext
    {
        public CatsDbContext()
        {
        }

        public CatsDbContext(DbContextOptions<CatsDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Cat> Cats { get; set; }

        public virtual DbSet<Female> Females { get; set; }

        public virtual DbSet<Male> Males { get; set; }

        public virtual DbSet<Pet> Pets { get; set; }

        public virtual DbSet<ApplicationUser> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
