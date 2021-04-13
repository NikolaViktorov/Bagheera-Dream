import { Link } from 'react-router-dom';
import { Component } from 'react';

import * as petsService from '../../services/petsService';

import Pet from './Pet';

class PublicPets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pets: []
        }
    }

    async componentDidMount() {
        const loggedInUser = localStorage.getItem('BagheeraCatUserId');
        if (!loggedInUser) {
            this.props.history.push('/user/login');
        }
        const pets = await petsService.getPets(10); // 10 for count of public cats on single page - paging not yet implemented
        this.setState({
            pets: pets,
        });
    }

    render() {
        return (
            <div>
                <Link className="myCats" to="/pets/my">See your pets</Link>
                <Link className="shareCat" to="/pets/share">Share your own pet</Link>
                <div className="petContainer">
                {
                   this.state.pets.length !== 0 ? 
                   this.state.pets.map(p => <Pet key={p.PetId} PetId={p.PetId} Age={p.Age} ProfileImage={p.ProfileImage} Name={p.Name} ownerEmail={p.OwnerEmail} />) 
                   : <h1>There are not any public pets! 
                       Be the first one to share your own pet! <Link to='/pets/share'>Share your pet</Link>
                   </h1>
                }
                </div>
            </div>
        );
    }
}

export default PublicPets;