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

export function getUserData(userId) {
    return fetch(url + '/users/user?userId=' + userId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => res);
}

export function checkPassword(userId, pass) {
    return fetch(url + '/users/checkPassword?userId=' + userId + '&password=' + pass, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => res);
}

export function changePassword(userId, pass) {
    const data = {
        UserId: userId,
        NewPassword: pass,
    };
    return fetch(url + '/users/changePassword', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res)
}

export function isAdministrator(userId) {
    return fetch(url + '/users/isAdministrator?userId=' + userId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => res);
}