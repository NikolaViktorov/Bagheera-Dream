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

        [HttpGet("user")]
        public async Task<string> GetUserData(string userId)
        {
            try
            {
                var userData = await this.usersService.GetUserData(userId);
                return userData;
            }
            catch (ArgumentException e)
            {
                return e.Message;
            }
        }

        [HttpGet("isAdministrator")]
        public async Task<bool> IsAdministrator(string userId)
        {
            try
            {
                var result = await this.usersService.IsAdministrator(userId);
                return result;
            }
            catch (ArgumentException e)
            {
                return false;
            }
        }

        [HttpGet("checkPassword")]
        public async Task<bool> CheckUserPassword(string userId, string password)
        {
            try
            {
                var userData = await this.usersService.CheckUserPassword(userId, password);
                return userData;
            }
            catch (ArgumentException e)
            {
                return false;
            }
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangeUserPassword(ChangePasswordModel model)
        {
            try
            {
                await this.usersService.ChangeUserPassword(model);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest();
            }
        }
    }
}
