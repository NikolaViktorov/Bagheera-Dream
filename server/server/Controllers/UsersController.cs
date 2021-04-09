using Microsoft.AspNetCore.Mvc;
using server.Services.Contracts;
using server.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterInputModel model)
        {
            try
            {
                await this.usersService.Register(model);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<string> Login(LoginInputModel model)
        {
            try
            {
                var userData = await this.usersService.Login(model);
                return userData;
            }
            catch (ArgumentException e)
            {
                return e.Message;
            }
        }
    }
}
