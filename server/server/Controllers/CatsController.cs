﻿namespace server.Controllers
{
    using System;
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

        [HttpGet("sliderCats")]
        public async Task<string> SliderCats(int count)
        {
            return await this.catsService.GetSliderCats(count);
        }

        [HttpGet("cat")] 
        public async Task<string> GetCat(string id)
        {
            return await this.catsService.GetCat(id);
        }

        [HttpPost("createPrivateCat")]
        public async Task<IActionResult> CreatePrivateCat([FromForm] CatInputModel model)
        {
            await this.catsService.AddCat(model);
            return Ok();
        }

        [HttpDelete("deleteCat")]
        public async Task<IActionResult> DeleteCat(string catId)
        {
            try
            {
                await this.catsService.DeleteCat(catId);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest();
            }
        }
    }
}
