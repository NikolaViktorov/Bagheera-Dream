using Bagheeras.Dream.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Models;
using server.Services.Contracts;
using server.ViewModels.Users;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace server.Services
{
    public class UsersService : IUsersService
    {
        private readonly CatsDbContext db;

        public UsersService(CatsDbContext db)
        {
            this.db = db;
        }

        public async Task<string> Login(LoginInputModel input)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(u => u.Email == input.Email);
            if (user == null)
            {
                return "{\"error\":\"Invalid email\"}";
            }
            if(this.CheckPasswords(user.PasswordHash, input.Password))
            {
                return "{\"error\":\"Invalid password\"}";
            }

            var model = new UserViewModel()
            {
                UserId = user.Id,
                Email = user.Email,
                Username = user.UserName,
            };

            var json = JsonConvert.SerializeObject(model);

            return json;
        }

        public async Task Register(RegisterInputModel input)
        {
            if ((await this.db.Users.FirstOrDefaultAsync(u => u.Email == input.Email)) != null)
            {
                throw new ArgumentException("There is already a register user with the given email.");
            }

            var user = new ApplicationUser()
            {
                Email = input.Email,
                PasswordHash = this.HashPassword(input.Password),
                CreatedOn = DateTime.Now,
                NormalizedEmail = input.Email.ToUpper(),
                NormalizedUserName = input.Username.ToUpper(),
                UserName = input.Username,
            };

            await this.db.Users.AddAsync(user);
            await this.db.SaveChangesAsync();
        }

        private string HashPassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            string savedPasswordHash = Convert.ToBase64String(hashBytes);
            return savedPasswordHash;
        }

        private bool CheckPasswords(string userPass, string curPass)
        {
            byte[] hashBytes = Convert.FromBase64String(userPass);

            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            var pbkdf2 = new Rfc2898DeriveBytes(curPass, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return true;
                }
            }
            return false;
        }
    }
}
