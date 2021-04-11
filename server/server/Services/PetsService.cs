using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Models;
using server.Models.PublicPets;
using server.Services.Contracts;
using server.Services.Helpers;
using server.ViewModels.Pets;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class PetsService : IPetsService
    {
        private readonly CatsDbContext db;

        public PetsService(CatsDbContext db)
        {
            this.db = db;
        }

        public async Task<string> GetPets(int count)
        {
            // without count
            var pets = await this.db.Pets.Include(p => p.Owner).Select(p => new PetViewModel() { 
                PetId = p.PetId,
                Name = p.Name,
                Age = p.Age,
                ProfileImage = p.ProfileImage,
                OwnerEmail = p.Owner.Email,
            }).ToListAsync();

            var json = JsonConvert.SerializeObject(pets);

            return json;
        }

        public async Task SharePet(PetInputModel input)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(u => u.Id == input.OwnerId);
            if (user == null)
            {
                throw new ArgumentException("Invalid user id!");
            }

            var fileName = ImageUploader.UploadFile(input.File, "petImages");
            if (fileName == null)
            {
                throw new ArgumentException("Invalid image!");
            }

            var pet = new Pet()
            {
                Name = input.Name,
                Age = input.Age,
                Owner = user,
                OwnerId = user.Id,
                ProfileImage = fileName,
            };

            await this.db.Pets.AddAsync(pet);
            user.Pets.Add(pet);

            await this.db.SaveChangesAsync();
        }
    }
}
