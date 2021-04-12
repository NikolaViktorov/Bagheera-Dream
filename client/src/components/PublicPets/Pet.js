import { Component } from 'react';

import styles from './mystyle.module.css'; 

class Pet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.Name,
            age: props.Age,
            img: require("../../petImages/" + props.ProfileImage),
            ownerEmail: props.ownerEmail,
        }
    }

    render() {
        return (
            <div className={styles.petMain}>
                <h1 className={styles.petMainHead}>{this.state.name} is {this.state.age} years old. It belongs to {this.state.ownerEmail}</h1>
                <img className={styles.petMainImage} src={this.state.img.default}/>
            </div>
        );
    }
}

export default Pet;