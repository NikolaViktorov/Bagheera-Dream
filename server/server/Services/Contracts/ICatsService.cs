namespace server.Services.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using server.ViewModels.Cats;

    public interface ICatsService
    {
        public Task<ICollection<CatViewModel>> GetAll();

        public Task<CatDetailsViewModel> GetCat(string id);

        public Task AddCat(CatInputModel cat);
    }
}
