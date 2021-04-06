import { Link } from 'react-router-dom';

import { Component } from 'react';
import styles from './mystyle.module.css'; 

class FemaleCat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.CatId,
            name: props.Name,
            age: props.Age,
            img: require("../../catImages/" + props.ProfileImage)
        }
    }

    render() {
        return (
            <div className={styles.catMain}>
                <h1 className={styles.catMainHead}>{this.state.name} is {this.state.age}</h1>
                <Link to={'/cat/' + this.state.id}>
                    <img className={styles.catMainImage} src={this.state.img.default}/>
                </Link>
            </div>
        );
    }
}

export default FemaleCat;