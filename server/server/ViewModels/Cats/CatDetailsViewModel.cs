namespace server.ViewModels.Cats
{
    using System;

    using server.Models.Enums;

    public class CatDetailsViewModel
    {
        public string CatId { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string ProfileImage { get; set; }

        public string Gender { get; set; }

        public string Color { get; set; }

        public string Breed { get; set; }

        public DateTime Birthday { get; set; }

        public ParentPartialViewModel Mother { get; set; }

        public ParentPartialViewModel Father { get; set; }
    }
}
