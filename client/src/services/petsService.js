import { post } from 'axios'; 

const url = 'http://localhost:52818';

export function getPets(count) {
    return fetch(url + '/pets/getPets?count=' + count, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err); 
}

export function sharePet(pet) {
    var filesArray  = pet.Files;
    let f = new FormData();
    f.append("Name",pet.Name);
    f.append("Age",pet.Age);
    f.append("File",filesArray[0]);
    f.append("OwnerId",pet.OwnerId);
    return post(url + '/Pets/addPet', f, {
            headers: {'Content-Type': 'multipart/form-data'} // works
    });
}

export function getOwnerPets(ownerId) {
    return fetch(url + '/pets/getOwnerPets?ownerId=' + ownerId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err); 
}

export function deletePet(petId) {
    return fetch(url + '/pets/deletePet?petId=' + petId, {
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

export function editPet(pet) {
    return fetch(url + '/pets/editPet', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(pet),
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err); 
}


export function getPet(petId) {
    return fetch(url + '/pets/getPet?petId=' + petId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err); 
}