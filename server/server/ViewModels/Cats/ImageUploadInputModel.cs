using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModels.Cats
{
    public class ImageUploadInputModel
    {
        public IFormFile File { get; set; }
    }
}
