namespace server.ViewModels.Pets
{
    using Microsoft.AspNetCore.Http;

    public class PetInputModel
    {
        public IFormFile File { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string OwnerId { get; set; }
    }
}
