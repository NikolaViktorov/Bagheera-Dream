import { post } from 'axios'; 

const url = 'http://localhost:52818';

// Testing 
export function demoGet() {
     fetch(url + '/Cats/cats')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

export function demoCreate() {
        let demo = {
                Name: 'Pesho',
                Age: 10,
        }

        fetch(url + '/Cats/createCat', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(demo)
        })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function createPrivateCat(cat) { 
        console.log(cat);
        return fetch(url + '/Cats/createCat', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(cat)
        })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function uploadPrivateCatImage(images) {
        const newUrl = url + '/Cats/uploadCatImage';
        const formData = new FormData();
        formData.append('file', images);
        const config = {
                headers: {
                        'content-type': 'multipart/form-data',  
                },
        };
        post(newUrl, formData, config);
}