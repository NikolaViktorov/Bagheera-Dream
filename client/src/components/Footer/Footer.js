import { Link } from 'react-router-dom';

const Footer = () => {
    return (
    <footer>
        <div className="footer-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 footer-about wow fadeInUp">
                        <h3>About us</h3>
                        <p>
                            Bagheera's Dream is a cattery mainly for the british shorthair breed.
                             We have lots of cute kittens and if you want to get one for yourself or 
                             for seomeone you know, you <b>will</b> be able to see and order some from this website.                     
                        </p>
                        <p>&copy; Bagheera's Dream.</p>
                    </div>
                    <div className="col-md-4 offset-md-1 footer-contact wow fadeInDown">
                        <h3>Contact</h3>
                        <p><i className="fas fa-map-marker-alt"></i> Rammberg 18, 06295 Lutherstadt Eisleben, Germany</p>
                        <p><i className="fas fa-phone"></i> Phone: (+359) 888 678 880</p>
                        <p><i className="fas fa-envelope"></i> Email: <a href="mailto:nikolchomc@gmail.com">nikolchomc@gmail.com</a></p>
                        <p><i className="fab fa-facebook"></i><a target="_blank" href="https://www.facebook.com/nina.manova.7/">Facebook</a></p>
                    </div>
                    <div className="col-md-4 footer-links wow fadeInUp">
                        <div className="row">
                            <div className="col">
                                <h3>Links</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p><Link to="/">Home</Link></p>
                                <p><Link to="/cats/female">Female Cats</Link></p>
                                <p><Link to="/cats/male">Male Cats</Link></p>
                                <p><Link to="/pets">Public Pets</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default Footer;