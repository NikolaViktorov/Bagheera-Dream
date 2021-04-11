namespace server.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using server.Services.Contracts;
    using server.ViewModels.Pets;

    [ApiController]
    [Route("[controller]")]
    public class PetsController : ControllerBase
    {
        private readonly IPetsService petsService;

        public PetsController(IPetsService petsService)
        {
            this.petsService = petsService;
        }

        [HttpGet("getPets")]
        public async Task<string> GetPets(int count)
        {
            try
            {
                var model = await this.petsService.GetPets(count);
                return model;
            }
            catch (ArgumentException e)
            {
                return e.Message;
            }
        }

        [HttpGet("getPet")]
        public async Task<string> GetPet(string petId)
        {
            try
            {
                var model = await this.petsService.GetPet(petId);
                return model;
            }
            catch (ArgumentException e)
            {
                return e.Message;
            }
        }

        [HttpGet("getOwnerPets")]
        public async Task<string> GetOwnerPets(string ownerId)
        {
            try
            {
                var model = await this.petsService.GetUserPets(ownerId);
                return model;
            }
            catch (ArgumentException e)
            {
                return e.Message;
            }
        }

        [HttpDelete("deletePet")]
        public async Task<IActionResult> DeletePet(string petId)
        {
            try
            {
                await this.petsService.DeletePet(petId);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest();
            }
        }

        [HttpPatch("editPet")]
        public async Task<IActionResult> EditPet(EditPetInputModel model)
        {
            try
            {
                await this.petsService.EditPet(model);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest();
            }
        }

        [HttpPost("addPet")]
        public async Task<string> AddPet([FromForm] PetInputModel model)
        {
            try
            {
                var message = await this.petsService.SharePet(model);
                return message;
            }
            catch (ArgumentException e)
            {
                return e.Message;
            }
        }
    }
}
