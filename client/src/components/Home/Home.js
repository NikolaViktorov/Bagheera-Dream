import * as catsService from '../../services/catsService';
import { Component } from 'react';

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import SliderCat from './SliderCat';

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
            </div>
        );
    }
}

export default Home;