import React, { useEffect, useState } from "react";

import { Link, NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as usersService from '../../services/usersService';

import logo from '../../images/logo.png';

const Header = () => {
    const [user, setUser] = useState()
    const [userId, setUserId] = useState()
    const [isAdmin, setIsAdmin] = useState()

    useEffect(async () => {
        const loggedInUserId = localStorage.getItem("BagheeraCatUserId");
        const loggedInUserName = localStorage.getItem("BagheeraCatUserName");
          if (loggedInUserId) {
            setUser(loggedInUserName);
            setUserId(loggedInUserId);
            const isAdmin = await usersService.isAdministrator(loggedInUserId);
            setIsAdmin(isAdmin);
        }
      }, [user]);
    
    let isLoggedIn = user !== undefined;

    return (
        <header>
        <nav className="navbar-expand-lg">
            <div className="container">
                <div className="collaps" id="navbarSupportedContent">
                    {isLoggedIn ? (<ul className="ml-auto">
                        <li className="nav-item">
                            <Link to="/">
                                <img className={styles.logoImage} src={logo} alt='Logo' />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/cats/female">Female Cats</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/cats/male">Male Cats</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/pets">Public Pets</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to={"/user/" + userId}>Hello, {user}</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="logoutBtn" onClick={usersService.logoutUser}>Logout</button>
                        </li>
                        {isAdmin ? 
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to={"/private/create"}>Add cat</NavLink>
                        </li> : ''}
                    </ul>) : (<ul className="ml-auto">
                    <li className="nav-item">
                            <Link to="/">
                                <img className={styles.logoImage} src={logo} alt='Logo' />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/cats/female">Female Cats</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/cats/male">Male Cats</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/user/register">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/user/login">Login</NavLink>
                        </li>
                    </ul>)}
                    
                </div>
            </div>
        </nav>
    </header>
    );
};


export default Header;