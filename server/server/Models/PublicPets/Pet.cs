namespace server.Models.PublicPets
{
    using System;

    public class Pet
    {
        public Pet()
        {
            this.PetId = Guid.NewGuid().ToString();
        }

        public string PetId { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string ProfileImage { get; set; }
    }
}
