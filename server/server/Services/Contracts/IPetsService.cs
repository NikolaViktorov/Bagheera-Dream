using server.ViewModels.Pets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Contracts
{
    public interface IPetsService
    {
        public Task<string> GetPets(int count);

        public Task<string> SharePet(PetInputModel input);

        public Task<string> GetUserPets(string ownerId);

        public Task DeletePet(string petId);

        public Task EditPet(EditPetInputModel model);

        public Task<string> GetPet(string petId);
    }
}
