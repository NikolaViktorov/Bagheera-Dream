import { Link } from 'react-router-dom';
import { Component } from 'react';

import styles from './mystyle.module.css';

import * as petsService from '../../services/petsService';

class MyPet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            petId: props.PetId,
            name: props.Name,
            age: props.Age,
            img: require("../../petImages/" + props.ProfileImage),
        }
    }

    async onDeletePetHandler(e) {
        e.preventDefault();
        await petsService.deletePet(this.state.petId);
        window.location.href = '/pets/my'
    }

    render() {
        return (
            <div className={styles.petMain}>
                <h1 className={styles.petMainHead}>{this.state.name} is {this.state.age} years old. It belongs to you</h1>
                <img className={styles.petMainImage} src={this.state.img.default} />
                <div>
                    <Link className={styles.edit} to={'/pets/edit/' + this.state.petId}>Edit {this.state.name}</Link>
                    <button className={styles.delete} onClick={this.onDeletePetHandler.bind(this)}>Delete {this.state.name} :(</button>
                </div>
            </div>
        );
    }
}

export default MyPet;