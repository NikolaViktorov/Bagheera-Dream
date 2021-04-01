using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModels.Cats
{
    public class CatInputModel
    {
        public IFormFile File { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public int Gender { get; set; }

        public int Breed { get; set; }

        public int Color { get; set; }

        public DateTime? Birthday { get; set; }

        public string FatherName { get; set; }

        public string MotherName { get; set; }
    }
}
