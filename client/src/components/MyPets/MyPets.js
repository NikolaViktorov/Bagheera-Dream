import { Link } from 'react-router-dom';
import { Component } from 'react';

import * as petsService from '../../services/petsService';

import MyPet from './MyPet';

class MyPets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pets: []
        }
    }

    async componentDidMount() {
        const loggedInUserId = localStorage.getItem('BagheeraCatUserId');
        if (!loggedInUserId) {
            this.props.history.push('/user/login');
        }
        const pets = await petsService.getOwnerPets(loggedInUserId); 
        this.setState({
            pets: pets,
        });
    }

    render() {
        return (
            <div>
                <div className="petContainer">
                {
                   this.state.pets.length !== 0 ? 
                   this.state.pets.map(p => <MyPet key={p.PetId} PetId={p.PetId} Age={p.Age} ProfileImage={p.ProfileImage} Name={p.Name} />) 
                   : <h1>You do not have any pets! 
                       Share one so everyone can see how cute it is! <Link to='/pets/share'>Share your pet</Link>
                   </h1>
                }
                </div>
            </div>
        );
    }
}

export default MyPets;