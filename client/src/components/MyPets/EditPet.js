import * as petsService from '../../services/petsService'

import { Component } from 'react'

class EditPet extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            name: '',
            age: '',
            ownerId: '',
            petId: props.match.params.id,
        };
    }

    onEditPetSubmitHandler(e) {
        e.preventDefault();
        const { name, age } = e.target;
        if (name.value.length > 26 || name.value.length <= 1) {
            this.displayError('Name must be between 2 and 25 characters long!');
        } else if (age.value <= 0) {
            this.displayError('Age cannot be negative or 0!');
        } else {
            const pet = {
                PetId: this.state.petId,
                Name: name.value,
                Age: Number(age.value),
            }
            petsService.editPet(pet)
                    .then(() => {
                        this.props.history.push('/pets/my')
                    })
        }
    }

    displayError(errorMessage) {
        this.setState({
            error: errorMessage
        })
    }

    async componentDidMount() {
        const loggedInUserId = localStorage.getItem('BagheeraCatUserId');
        if (!loggedInUserId) {
            this.props.history.push('/user/login');
        }
        const pet = await petsService.getPet(this.state.petId);
        if (pet.OwnerId !== loggedInUserId) {
            this.props.history.push('/pets');
        } 
        this.setState( {
            name: pet.Name,
            age: pet.Age,
            ownerId: pet.OwnerId,
        });
    }

    render() {
        return (
            <section class="create">
                <form onSubmit={this.onEditPetSubmitHandler.bind(this)}>
                    <fieldset>
                        <legend>Edit your pet!</legend>
                        <span className="error">{this.state.error}</span>
                        <p className="field">
                            <label htmlFor="name">Name</label>
                            <span class="input">
                                <input type="text" name="name" id="name" placeholder={this.state.name} />
                                <span class="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                        <label htmlFor="age">Age</label>
                            <span class="input">
                                <input type="text" name="age" id="age" placeholder={this.state.age} />
                                <span class="actions"></span>
                            </span>
                        </p>
                        <input className="button submit" type="submit" value="Edit your pet" />
                    </fieldset>
                </form>
            </section>
        );
    }
};

export default EditPet;