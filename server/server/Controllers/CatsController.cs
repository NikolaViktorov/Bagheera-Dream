using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols;
using server.Models;
using server.Services.Contracts;
using server.ViewModels.Cats;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
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
        public async Task<IActionResult> UploadCatImage([FromForm] ImageUploadInputModel model)
        {
            var file = model.File;

            if (file.Length > 0)
            {
                string path = Path.Combine("uploadFiles");
                using (var fs = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fs);
                }
            }
            return BadRequest();
        }
    }
}
