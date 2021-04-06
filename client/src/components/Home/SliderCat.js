import { Component } from 'react';
import { Link } from 'react-router-dom';

class SliderCat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.Name,
            id: props.CatId,
            img: require("../../catImages/" + props.ProfileImage)
        }
    }

    render() {
        return (
            <div className="each-fade">
                <div className="image-container">
                    <Link to={"/cat/" + this.state.id}>
                        <img className="catsImage" src={this.state.img.default} />
                    </Link>
                </div>
            </div>

        );
    }
}
/*
<div className="mySlides">
                <img className="newsImage" src={this.state.img.default} />
                <div className="news-title">{this.state.name}</div>
                <Link to={'/cat/' + this.state.id} className="btn btn-info text-uppercase news-btn">SEE MORE</Link>
            </div>
*/

export default SliderCat;