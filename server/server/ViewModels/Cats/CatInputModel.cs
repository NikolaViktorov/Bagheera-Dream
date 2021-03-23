namespace server.ViewModels.Cats
{
    using System;

    using server.Models.Enums;
    using Microsoft.AspNetCore.Http;

    public class CatInputModel
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public Gender Gender { get; set; }

        public Breed Breed { get; set; }

        public Color Color { get; set; }

        public DateTime? Birthday { get; set; }

        public IFormFile ProfileImage { get; set; }

        public string FatherName { get; set; }

        public string MotherName { get; set; }
    }
}
