import * as catsService from '../../services/catsService'
import * as usersService from '../../services/usersService';

import ImageUploader from 'react-images-upload';
import { Component } from 'react'

class CreatePrivateCat extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pictures: [], 
            error: '',
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onCreatePrivateCatSubmitHandler(e) {
        e.preventDefault();
        const { name, age, gender, breed, color, birthday, FatherName, MotherName } = e.target;      
        if (name.value.length < 2 || name.value.length > 26 ) {
            this.displayError('Name must be between 2 and 25 characters long!');
        } else if (age.value <= 0) {
            this.displayError('Age cannot be negative or 0!');
        } else if (this.state.pictures.length <= 0) {
            this.displayError('You must select a picture for your pet!');
        } else if (!birthday.value) {
            this.displayError('Select a valid date for birthday!');
        } else {
            const cat = {
                Name: name.value,
                Age: Number(age.value),
                Gender: Number(gender.value),
                Breed: Number(breed.value),
                Color: Number(color.value),
                Birthday: birthday.value,
                FatherName: FatherName.value,
                MotherName: MotherName.value,
                Files: this.state.pictures,
            }
            catsService.createPrivateCat(cat)
                .then(() => {
                    //this.props.history.push('/')
                    window.location.href = '/';
                });
        }
    }

    displayError(errorMessage) {
        this.setState({
            error: errorMessage
        })
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        this.previewPic(picture);
    }

    async componentDidMount() {
        const loggedInUserId = localStorage.getItem('BagheeraCatUserId');
        if (!loggedInUserId) {
            return this.props.history.push('/user/login');
        }
        const isAdmin = await usersService.isAdministrator(loggedInUserId);
        if (!isAdmin) {
            this.props.history.push('/pets');
        }
    }

    previewPic(pic) {
        console.log(pic)
        document.getElementById('preview').src = window.URL.createObjectURL(pic[0]);
    }

    render() {
        return (
            <section className="create">
                <form onSubmit={this.onCreatePrivateCatSubmitHandler.bind(this)}>
                    <fieldset>
                        <legend>Add a new Cat</legend>
                        <span className="error">{this.state.error}</span>
                        <p className="field">
                            <label htmlFor="name">Name</label>
                            <span className="input">
                                <input type="text" name="name" id="name" placeholder="Name" />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                        <label htmlFor="age">Age</label>
                            <span className="input">
                                <input type="text" name="age" id="age" placeholder="Age" />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="gender">Gender</label>
                            <span className="input">
                                <select type="text" name="gender">
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </select>
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="breed">Breed</label>
                            <span className="input">
                                <select type="text" name="breed">
                                    <option value="0">British Shorthair</option>
                                </select>
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="color">Color</label>
                            <span className="input">
                                <select type="text" name="color">
                                    <option value="0">Lilac</option>
                                    <option value="1">Gray</option>
                                </select>
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="birthday">Birthday</label>
                            <span className="input">
                                <input type="date" name="birthday" id="birthday" placeholder="Birthday" />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="FatherName">Father's Name</label>
                            <span className="input">
                                <input type="text" name="FatherName" id="FatherName" placeholder="Only enter if the father is added already" />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="MotherName">Mother's Name</label>
                            <span className="input">
                                <input type="text" name="MotherName" id="MotherName" placeholder="Only enter if the mother is added already" />
                                <span className="actions"></span>
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
                        <input className="button submit" type="submit" value="Add Cat" />
                    </fieldset>
                </form>
            </section>
        );
    }
};

export default CreatePrivateCat;