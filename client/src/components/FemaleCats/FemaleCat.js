import { Component } from 'react';
import styles from './mystyle.module.css'; 

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
            <div className={styles.catMain}>
                <h1 className={styles.catMainHead}>{this.state.name} is {this.state.age}</h1>
                <img className={styles.catMainImage} src={this.state.img.default}/>
            </div>
        );
    }
}

export default FemaleCat;