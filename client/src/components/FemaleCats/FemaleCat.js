import { Component } from 'react';

class FemaleCat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.Name,
            age: props.Age,
            img: require("../../catImages/" + props.ProfileImage)
        }
    }

    render() {
        return (
            <div className='cat-main-content'>
                <h1 className='cat-main-head'>{this.state.name} is {this.state.age}</h1>
                <img className='cat-main-image' src={this.state.img.default}/>
            </div>
        );
    }
}

export default FemaleCat;