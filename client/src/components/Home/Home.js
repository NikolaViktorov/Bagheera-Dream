import * as catsService from '../../services/catsService';
import { Component } from 'react';

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import SliderCat from './SliderCat';

import emma from '../../images/emma.jpg';
import emma2 from '../../images/emma2.jpg'
import emma3 from '../../images/emma3.jpg'
import emma4 from '../../images/emma4.jpg'
import emma5 from '../../images/emma5.jpg'
import * as styles from './home.module.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderCats: []
        }
    }

    async componentDidMount() {
        const sliderCats = await catsService.getSliderCats(3);

        this.setState({ sliderCats: sliderCats });
    }

    returnSliderCats() {
        if (this.state.sliderCats.length == 0) {
            return (
                <div className="slideshow-container">
                    <div className="text-center">
                        <h1>
                            There are no main cats currently
                    </h1>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="slide-container">
                    <Fade>
                        {
                            this.state.sliderCats.map(c => <SliderCat key={c.CatId} CatId={c.CatId} ProfileImage={c.ProfileImage} />)
                        }
                    </Fade>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                { this.returnSliderCats()}
                <br />
                <div id="intro" className="basic-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="text-container">
                                    <div className="section-title">INFO</div>
                                    <h2>Bagheera's Dream - British shorthair cattery</h2>
                                    <p>Bagheera's Dream is a cattery mainly for the british shorthair breed. We have lots of cute kittens and if you want to get one for yourself or for seomeone you know, you will be able to see which kitten are for sale in this website or by contacting us using the information at the bottom of the page.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={styles.photoMain}>
                                    <h3>This is our cat Emma (on the right) winning awards at cats show</h3>
                                    <img className={styles.homePageImage} src={emma} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className={styles.photoMain}>
                                    <h3>This is again Emma (on the right) in the same cat show as in the left picture</h3>
                                    <img className={styles.homePageImage} src={emma2} />
                                </div>
                            </div>
                        </div>
                        <br />
                        <h4>Some more photos of Emma</h4>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className={styles.photoMain}>
                                    <img className={styles.homePageImage} src={emma3} />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={styles.photoMain}>
                                    <img className={styles.homePageImage} src={emma4} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className={styles.photoMain}>
                                    <img className={styles.homePageImage} src={emma5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default Home;