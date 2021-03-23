using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Models;
using server.Services.Contracts;
using server.ViewModels.Cats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
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
        public async Task<ICollection<CatViewModel>> GetCats()
        {
            return await this.catsService.GetAll();
        }

        [HttpGet("cat")]
        public async Task<CatDetailsViewModel> GetCat(string id)
        {
            return await this.catsService.GetCat(id);
        }

        [HttpPost("createCat")]
        public async Task<bool> CreateCat(CatInputModel cat)
        {
            bool didPass = false;
            try
            {
                await this.catsService.AddCat(cat);
                didPass = true;
            }
            catch (Exception e)
            {
                // ?? pass to react somehow
            }

            return didPass;
        }
    }
}
