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

        public Task SharePet(PetInputModel input);
    }
}
