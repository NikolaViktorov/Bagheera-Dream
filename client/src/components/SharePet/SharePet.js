import * as petsService from '../../services/petsService'

import ImageUploader from 'react-images-upload';
import { Component } from 'react'
import { wait } from '@testing-library/dom';
import { waitFor } from '@testing-library/dom';

class SharePet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            error: '',
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onSharePetSubmitHandler(e) {
        e.preventDefault();
        const { name, age } = e.target;
        if (name.value.length > 26 || name.value.length <= 1) {
            this.displayError('Name must be between 2 and 25 characters long!');
        } else if (age.value <= 0) {
            this.displayError('Age cannot be negative or 0!');
        } else if (this.state.pictures.length <= 0) {
            this.displayError('You must select a picture for your pet!');
        } else {
            const pet = {
                Name: name.value,
                Age: Number(age.value),
                OwnerId: localStorage.getItem('BagheeraCatUserId'),
                Files: this.state.pictures,
            }
            petsService.sharePet(pet)
                .then(res => {
                    if (res.data === 'You have reached the maximum amount of pets!') {
                        this.displayError(res.data);
                    } else {
                        this.props.history.push('/')
                        document.documentElement.scrollTop = 0;
                    }
                })
        }
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        this.previewPic(picture);
    }

    displayError(errorMessage) {
        this.setState({
            error: errorMessage
        })
    }

    componentDidMount() {
        const loggedInUser = localStorage.getItem('BagheeraCatUserId');
        if (!loggedInUser) {
            this.props.history.push('/user/login');
        }
    }

    previewPic(pic) {
        console.log(pic)
        document.getElementById('preview').src = window.URL.createObjectURL(pic[0]);
    }

    render() {
        return (
            <section class="create">
                <form onSubmit={this.onSharePetSubmitHandler.bind(this)}>
                    <fieldset>
                        <legend>Share your pet with us!</legend>
                        <span className="error">{this.state.error}</span>
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
                        <img className="imgPreview" src='' id='preview' alt='' />
                        <input className="button submit" type="submit" value="Share your pet" />
                    </fieldset>
                </form>
            </section>
        );
    }
};

export default SharePet;