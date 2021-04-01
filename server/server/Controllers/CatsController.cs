using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Models;
using server.Services.Contracts;
using server.ViewModels.Cats;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CatsController : ControllerBase
    {
        private readonly ICatsService catsService;
        private readonly IHostingEnvironment hostingEnvironment;

        public CatsController(ICatsService catsService, IHostingEnvironment hostingEnvironment)
        {
            this.catsService = catsService;
            this.hostingEnvironment = hostingEnvironment;
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

        [HttpPost("uploadCatImage")]
        public async Task<IActionResult> UploadCatImage([FromForm] ICollection<IFormFile> body)
        {
            string fileName = string.Empty;
            //if (body != null)
            //{
            //    string uploadDir = Path.Combine(this.hostingEnvironment.WebRootPath, "catImages");
            //    fileName = Guid.NewGuid().ToString() + "-" + body.FileName;
            //    string filePath = Path.Combine(uploadDir, fileName);
            //    using (var fileStream = new FileStream(filePath, FileMode.Create))
            //    {
            //        body.CopyTo(fileStream);
            //    }
            //}

            return Ok();
        }
    }
}
