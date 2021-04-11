namespace server.Services.Helpers
{
    using Microsoft.AspNetCore.Http;
    using System;
    using System.IO;


    public static class ImageUploader
    {
        public static string UploadFile(IFormFile file, string folderName)
        {
            string fileName = null;
            if (file != null)
            {
                string baseFolderPath = Path.GetFullPath(
                    Path.Combine(
                        Directory.GetCurrentDirectory(), @"..\..\")
                    );
                string clientFolderPath = baseFolderPath + "client\\src";
                string uploadDir = Path.Combine(clientFolderPath, folderName);
                fileName = Guid.NewGuid().ToString() + "-" + file.FileName;
                string filePath = Path.Combine(uploadDir, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
            }

            return fileName;
        }
    }
}
