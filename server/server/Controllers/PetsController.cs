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

        [HttpPost("addPet")]
        public async Task<IActionResult> AddPet([FromForm] PetInputModel model)
        {
            try
            {
                await this.petsService.SharePet(model);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest();
            }
        }
    }
}
