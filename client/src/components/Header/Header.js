import { Link, NavLink } from 'react-router-dom'
import styles from './header.module.css'

import logo from '../../images/logo.png';

const Header = () => {
    return (
        <header>
        <nav className="navbar-expand-lg">
            <div className="container">
                <div className="collaps" id="navbarSupportedContent">
                    <ul className="ml-auto">
                        <li className="nav-item">
                            <Link to="/">
                                <img className={styles.logoImage} src={logo} alt='Logo' />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/privacy">Privacy</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/cats/female">Female Cats</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName={styles.active} to="/cats/male">Male Cats</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
};


export default Header;