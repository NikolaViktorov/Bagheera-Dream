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
        const pets = await petsService.getPets(10); // 10 for count of public cats on single page - paging not yet implemented
        this.setState({
            pets: pets,
        });
    }

    render() {
        return (
            <div>
                {
                   this.state.pets !== undefined ? 
                   this.state.pets.map(p => <Pet key={p.PetId} Age={p.Age} ProfileImage={p.ProfileImage} Name={p.Name} ownerEmail={p.OwnerEmail} />) 
                   : <h1>There are not any public pets! 
                       Be the first one to share your own pet! <Link to='/pets/share'>Share your pet</Link>
                   </h1>
                }
            </div>
        );
    }
}

export default PublicPets;