import { post } from 'axios'; 

const url = 'http://localhost:52818';

export function registerUser(user) {
    return fetch(url + '/users/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.status === 400) {
            return 'User with this email already exists';
        } else {
            return res;
        }
    });
}

export function loginUser(user) {
    return fetch(url + '/users/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(res => res);
}

export function logoutUser(user) {
    localStorage.clear();
    console.log('over');
    window.location.href = '/';
    window.location.reload();
}
