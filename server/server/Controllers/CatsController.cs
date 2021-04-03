namespace server.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    
    using server.Services.Contracts;
    using server.ViewModels.Cats;


    [ApiController]
    [Route("[controller]")]
    public class CatsController : ControllerBase
    {
        private readonly ICatsService catsService;

        public CatsController(ICatsService catsService)
        {
            this.catsService = catsService;
        }

        [HttpGet("cats")]
        public async Task<string> GetCats(string gender)
        {
            return await this.catsService.GetAll(gender);
        }

        [HttpGet("cat")]
        public async Task<CatDetailsViewModel> GetCat(string id)
        {
            return await this.catsService.GetCat(id);
        }

        [HttpPost("createPrivateCat")]
        public async Task<IActionResult> CreatePrivateCat([FromForm] CatInputModel model)
        {
            await this.catsService.AddCat(model);
            return Ok();
        }
    }
}
