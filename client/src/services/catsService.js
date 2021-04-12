import { post } from 'axios'; 

const url = 'http://localhost:52818';

export function getPrivateCats(gender) {
        return fetch(url + '/Cats/cats?gender=' + gender, {
                method: 'GET',
                mode: 'cors',
                headers: {
                        'content-type': 'application/json',
                },
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
}

export function getCatDetails(catId) {
        return fetch(url + '/Cats/cat?id=' + catId, {
                method: 'GET',
                mode: 'cors',
                headers: {
                        'content-type': 'application/json',
                },
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
}

export function createPrivateCat(cat) { 
       var filesArray  = cat.Files;
        for(var i in filesArray){
                let f = new FormData();
                f.append("File",filesArray[i])
                f.append("Name",cat.Name);
                f.append("Age",cat.Age);
                f.append("Gender",cat.Gender);
                f.append("Breed",cat.Breed);
                f.append("Color",cat.Color);
                f.append("Birthday",cat.Birthday);
                f.append("FatherName",cat.FatherName);
                f.append("MotherName",cat.MotherName);
                return post(url + '/Cats/createPrivateCat', f, {
                       headers: {'Content-Type': 'multipart/form-data'} // works
                });
           }
}

export function getSliderCats(count) {
        return fetch(url + '/Cats/sliderCats?count=' + count, {
                method: 'GET',
                mode: 'cors',
                headers: {
                        'content-type': 'application/json',
                },
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
}

export function deleteCat(catId) {
        return fetch(url + '/Cats/deleteCat?catId=' + catId, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                        'content-type': 'application/json',
                },
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err); 
}