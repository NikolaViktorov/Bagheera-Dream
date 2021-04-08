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