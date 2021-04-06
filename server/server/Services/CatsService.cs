using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Models;
using server.Models.Cats;
using server.Models.Enums;
using server.Services.Contracts;
using server.ViewModels.Cats;

namespace server.Services
{
    public class CatsService : ICatsService
    {
        private readonly CatsDbContext db;

        public CatsService(CatsDbContext db)
        {
            this.db = db;
        }

        public async Task AddCat(CatInputModel input)
        {
            var fileName = this.UploadFile(input);

            var cat = new Cat()
            {
                Name = input.Name,
                Age = input.Age,
                Birthday = input.Birthday,
                Gender = (Gender)input.Gender,
                Breed = (Breed)input.Breed, 
                Color = (Color)input.Color,
                ProfileImage = fileName,
            };

            await this.db.Cats.AddAsync(cat);
            await this.db.SaveChangesAsync();

            Male father = null;
            Female mother = null;

            if (!string.IsNullOrEmpty(input.FatherName) || !string.IsNullOrWhiteSpace(input.FatherName))
            {
                var fatherCat = await this.db.Males.FirstOrDefaultAsync(c => c.Name == input.FatherName);

                if (fatherCat == null)
                {
                    var catNotFather = await this.db.Cats.FirstOrDefaultAsync(c => c.Name == input.FatherName);
                    this.db.Cats.Remove(catNotFather);

                    father = new Male()
                    {
                        Name = catNotFather.Name,
                        Age = catNotFather.Age,
                        Birthday = catNotFather.Birthday,
                        Gender = catNotFather.Gender,
                        Breed = catNotFather.Breed,
                        Color = catNotFather.Color,
                        FatherId = catNotFather.FatherId,
                        Father = catNotFather.Father,
                        MotherId = catNotFather.MotherId,
                        Mother = catNotFather.Mother,
                        ProfileImage = catNotFather.ProfileImage,
                    };

                    await this.db.Males.AddAsync(father);
                    await this.db.SaveChangesAsync();

                    cat.FatherId = father.CatId;
                    cat.Father = father;

                    father.Children.Add(cat);
                }
                else
                {
                    cat.FatherId = fatherCat.CatId;
                    cat.Father = fatherCat;
                    fatherCat.Children.Add(cat);
                }
            }

            if (!string.IsNullOrEmpty(input.MotherName) || !string.IsNullOrWhiteSpace(input.MotherName))
            {
                var motherCat = await this.db.Females.FirstOrDefaultAsync(c => c.Name == input.MotherName);

                if (motherCat == null)
                {
                    var catNotMother = await this.db.Cats.FirstOrDefaultAsync(c => c.Name == input.MotherName);
                    this.db.Cats.Remove(catNotMother);

                    mother = new Female()
                    {
                        Name = catNotMother.Name,
                        Age = catNotMother.Age,
                        Birthday = catNotMother.Birthday,
                        Gender = catNotMother.Gender,
                        Breed = catNotMother.Breed,
                        Color = catNotMother.Color,
                        FatherId = catNotMother.FatherId,
                        Father = catNotMother.Father,
                        MotherId = catNotMother.MotherId,
                        Mother = catNotMother.Mother,
                        ProfileImage = catNotMother.ProfileImage,
                    };

                    await this.db.Females.AddAsync(mother);
                    await this.db.SaveChangesAsync();

                    cat.MotherId = mother.CatId;
                    cat.Mother = mother;

                    mother.Children.Add(cat);
                }
                else
                {
                    cat.MotherId = motherCat.CatId;
                    cat.Mother = motherCat;

                    motherCat.Children.Add(cat);
                }
            }

            await this.db.SaveChangesAsync();
        }

        public async Task<string> GetAll(string gender)
        {
            var genderId = (int)Enum.Parse(typeof(Gender), gender);
            List<CatViewModel> cats = new List<CatViewModel>();
            if (gender == null)
            {
                cats = await this.db.Cats.Select(c => new CatViewModel()
                {
                    CatId = c.CatId,
                    Name = c.Name,
                    Age = c.Age,
                    ProfileImage = c.ProfileImage,
                }).ToListAsync();
            }
            else
            {
                cats = await this.db.Cats.Where(c => c.GenderId == genderId).Select(c => new CatViewModel()
                {
                    CatId = c.CatId,
                    Name = c.Name,
                    Age = c.Age,
                    ProfileImage = c.ProfileImage,
                }).ToListAsync();
            }

            var json = JsonConvert.SerializeObject(cats);
            return json;
        }

        public async Task<string> GetCat(string id)
        {
            var cat = await this.db.Cats.FirstOrDefaultAsync(c => c.CatId == id);

            if (cat == null)
            {
                throw new ArgumentException("There is no cat with given id!");
            }

            var model = new CatDetailsViewModel()
            {
                Name = cat.Name,
                Age = cat.Age,
                Birthday = (DateTime)cat.Birthday,
                Gender = cat.Gender.ToString(),
                Breed = cat.Breed.ToString(),
                Color = cat.Color.ToString(),
                ProfileImage = cat.ProfileImage,
            };

            if (!string.IsNullOrEmpty(cat.FatherId))
            {
                var father = await this.db.Cats.FirstOrDefaultAsync(c => c.CatId == cat.FatherId);
                model.Father = new ParentPartialViewModel()
                {
                    CatId = father.CatId,
                    Name = father.Name,
                    ProfileImage = father.ProfileImage,
                };
            }

            if (!string.IsNullOrEmpty(cat.MotherId))
            {
                var mother = await this.db.Cats.FirstOrDefaultAsync(c => c.CatId == cat.MotherId);
                model.Mother = new ParentPartialViewModel()
                {
                    CatId = mother.CatId,
                    Name = mother.Name,
                    ProfileImage = mother.ProfileImage,
                };
            }

            var json = JsonConvert.SerializeObject(model);

            return json;
        }

        private string UploadFile(CatInputModel input)
        {
            string fileName = null;
            if (input.File != null)
            {
                string baseFolderPath = Path.GetFullPath(
                    Path.Combine(
                        Directory.GetCurrentDirectory(), @"..\..\")
                    );
                string clientFolderPath = baseFolderPath + "client\\src";
                string uploadDir = Path.Combine(clientFolderPath, "catImages");
                fileName = Guid.NewGuid().ToString() + "-" + input.File.FileName;
                string filePath = Path.Combine(uploadDir, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    input.File.CopyTo(fileStream);
                }
            }

            return fileName;
        }
    }
}
