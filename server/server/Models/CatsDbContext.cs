using Microsoft.EntityFrameworkCore;
using server.Models.Cats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
