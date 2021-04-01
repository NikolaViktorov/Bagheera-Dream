namespace server.ViewModels.Cats
{
    using System;

    using server.Models.Enums;
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;

    public class CatInputModel
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public int Gender { get; set; }

        public int Breed { get; set; }

        public int Color { get; set; }

        public DateTime? Birthday { get; set; }

        public IFormFile ProfileImage { get; set; }

        public string FatherName { get; set; }

        public string MotherName { get; set; }
    }
}
