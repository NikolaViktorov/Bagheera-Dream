import { Component } from 'react';

import styles from './mystyle.module.css'; 
import * as usersService from '../../services/usersService';
import * as petsService from '../../services/petsService';

class Pet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            petId: props.PetId,
            name: props.Name,
            age: props.Age,
            img: require("../../petImages/" + props.ProfileImage),
            ownerEmail: props.ownerEmail,
            isAdmin: false,
        }
    }

    async componentDidMount() {
        const loggedInUserId = localStorage.getItem('BagheeraCatUserId');
        const isAdmin = await usersService.isAdministrator(loggedInUserId);
        if (isAdmin) {
            this.setState({
                isAdmin: isAdmin,
            })
        };
    }

    onDeletePetHandler(e) {
        e.preventDefault();
        if (this.state.isAdmin === false) {
            this.props.history.push('/');
            return;
        }
        petsService.deletePet(this.state.petId).then(() => window.location.href = '/pets');
    }

    render() {
        return (
            <div className={styles.petMain}>
                { this.state.isAdmin ? <button className="delete" onClick={this.onDeletePetHandler.bind(this)}>Delete</button> : ''}
                <h1 className={styles.petMainHead}>{this.state.name} is {this.state.age} years old. It belongs to {this.state.ownerEmail}</h1>
                <img className={styles.petMainImage} src={this.state.img.default}/>
            </div>
        );
    }
}

export default Pet;