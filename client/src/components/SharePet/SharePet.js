import * as petsService from '../../services/petsService'

import ImageUploader from 'react-images-upload';
import { Component } from 'react'

class SharePet extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pictures: [], 
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onSharePetSubmitHandler(e) {
        e.preventDefault();
        const { name, age } = e.target;
        const pet = {
            Name: name.value,
            Age: Number(age.value),
            OwnerId: localStorage.getItem('BagheeraCatUserId'),
            Files: this.state.pictures,
        }
        petsService.sharePet(pet)
            .then(res => console.log(res));
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        return (
            <section class="create">
                <form onSubmit={this.onSharePetSubmitHandler.bind(this)}>
                    <fieldset>
                        <legend>Share your pet with us!</legend>
                        <p className="field">
                            <label htmlFor="name">Name</label>
                            <span class="input">
                                <input type="text" name="name" id="name" placeholder="Name" />
                                <span class="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                        <label htmlFor="age">Age</label>
                            <span class="input">
                                <input type="text" name="age" id="age" placeholder="Age" />
                                <span class="actions"></span>
                            </span>
                        </p>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                        <input className="button submit" type="submit" value="Share your pet" />
                    </fieldset>
                </form>
            </section>
        );
    }
};

export default SharePet;