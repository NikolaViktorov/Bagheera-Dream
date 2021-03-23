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