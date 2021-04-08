using Bagheeras.Dream.Data.Models;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace server.Services.Contracts
{
    public class UsersService : IUsersService
    {
        private readonly CatsDbContext db;

        public UsersService(CatsDbContext db)
        {
            this.db = db;
        }

        public Task Login(RegisterInputModel input)
        {
            throw new NotImplementedException();
        }

        public async Task Register(RegisterInputModel input)
        {
            if (this.db.Users.FirstOrDefaultAsync(u => u.Email == input.Email) != null)
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
    }
}
