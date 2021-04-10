import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

import * as usersService from '../../services/usersService';

const UserDetails = (
    props
) => {
    const [user, setUser] = useState({})

    useEffect(async () => {
        const loggedInUserId = localStorage.getItem("BagheeraCatUserId");
        if (!loggedInUserId) {
            props.history.push('/user/login');
        } else if (loggedInUserId !== props.match.id) {
            props.history.push('/user/' + loggedInUserId);
        }
        const userData = await usersService.getUserData(loggedInUserId);
        setUser(userData);
    }, []);

    return (
        <div className="userDetailsContainer">
            <h1>Username: {user.Username}</h1>
            <p>Email: {user.Email}</p>
            <Link to={'/user/changePassword'}>Change password?</Link>
        </div>
    );
};

export default UserDetails;