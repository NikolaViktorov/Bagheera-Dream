namespace server.Services.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using server.ViewModels.Cats;

    public interface ICatsService
    {
        public Task<string> GetAll(string gender);

        public Task<string> GetCat(string id);

        public Task AddCat(CatInputModel cat);

        public Task DeleteCat(string catId);

        public Task<string> GetSliderCats(int count);
    }
}
