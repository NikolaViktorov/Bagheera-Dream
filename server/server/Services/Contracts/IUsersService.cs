using server.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Contracts
{
    public interface IUsersService
    {
        public Task Register(RegisterInputModel input);

        public Task<string> Login(LoginInputModel input);

        public Task<string> GetUserData(string userId);

        public Task<bool> CheckUserPassword(string userId, string password);

        public Task ChangeUserPassword(ChangePasswordModel input);
    }
}
