namespace server.Models.PublicPets
{
    using Bagheeras.Dream.Data.Models;
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

        public virtual ApplicationUser Owner { get; set; }

        public string OwnerId { get; set; }
    }
}
