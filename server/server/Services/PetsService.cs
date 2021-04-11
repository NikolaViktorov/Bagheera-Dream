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

        public async Task DeletePet(string petId)
        {
            var pet = await this.db.Pets.Include(p => p.Owner).FirstOrDefaultAsync(p => p.PetId == petId);
            if (pet == null)
            {
                throw new ArgumentException("Pet id is invalid!");
            }

            var owner = await this.db.Users.FirstOrDefaultAsync(u => u.Id == pet.OwnerId);
            if (owner == null)
            {
                throw new ArgumentException("This is not your pet!");
            }

            owner.Pets.Remove(pet);
            this.db.Pets.Remove(pet);
            await this.db.SaveChangesAsync();
        }

        public async Task EditPet(EditPetInputModel model)
        {
            var pet = await this.db.Pets.Include(p => p.Owner).FirstOrDefaultAsync(p => p.PetId == model.PetId);
            if (pet == null)
            {
                throw new ArgumentException("Pet id is invalid!");
            }

            pet.Name = model.Name;
            pet.Age = model.Age;
            await this.db.SaveChangesAsync();
        }

        public async Task<string> GetPet(string petId)
        {
            var pet = await this.db.Pets.FirstOrDefaultAsync(p => p.PetId == petId);
            if (pet == null)
            {
                throw new ArgumentException("Pet id is invalid!");
            }

            var viewModel = new EditPetInputModel()
            {
                Name = pet.Name,
                Age = pet.Age,
                PetId = pet.PetId,
                OwnerId = pet.OwnerId,
            };

            var json = JsonConvert.SerializeObject(pet);

            return json;
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

        public async Task<string> GetUserPets(string ownerId)
        {
            var user = await this.db.Users
                .Include(u => u.Pets)
                .FirstOrDefaultAsync(u => u.Id == ownerId);
            if (user == null)
            {
                throw new ArgumentException("Invalid user id!");
            }

            var pets = user.Pets.Select(p => new PetDetailsViewModel()
            {
                PetId = p.PetId,
                Name = p.Name,
                Age = p.Age,
                ProfileImage = p.ProfileImage,
            }).ToList();

            var json = JsonConvert.SerializeObject(pets);

            return json;
        }

        public async Task<string> SharePet(PetInputModel input)
        {
            var user = await this.db.Users
                .Include(u => u.Pets)
                .FirstOrDefaultAsync(u => u.Id == input.OwnerId);
            if (user == null)
            {
                throw new ArgumentException("Invalid user id!");
            }
            if(user.Pets.Count >= 5)
            {
                throw new ArgumentException("You have reached the maximum amount of pets!");
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
            return "Ok";
        }
    }
}
