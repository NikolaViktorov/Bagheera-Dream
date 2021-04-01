import { Link } from 'react-router-dom'

import logo from '../../images/logo.png';

const Header = () => {
    return (
        <header>
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo-image" src={logo} alt='Logo' />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collaps navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cats/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/privacy">Privacy</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
};


export default Header;