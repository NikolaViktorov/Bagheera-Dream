import * as catsService from '../../services/catsService'

import ImageUploader from 'react-images-upload';
import { Component } from 'react'

class CreatePrivateCat extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pictures: [], 
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onCreatePrivateCatSubmitHandler(e) {
        e.preventDefault();
        const { name, age, gender, breed, color, birthday, FatherName, MotherName } = e.target;
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
        catsService.createPrivateCat(cat);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        return (
            <section class="create">
                <form onSubmit={this.onCreatePrivateCatSubmitHandler.bind(this)}>
                    <fieldset>
                        <legend>Add a new Cat</legend>
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
                            <span class="input">
                                <input type="date" name="birthday" id="birthday" placeholder="Birthday" />
                                <span class="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="FatherName">Father's Name</label>
                            <span class="input">
                                <input type="text" name="FatherName" id="FatherName" placeholder="Only enter if the father is added already" />
                                <span class="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="MotherName">Mother's Name</label>
                            <span class="input">
                                <input type="text" name="MotherName" id="MotherName" placeholder="Only enter if the mother is added already" />
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
                        <input className="button submit" type="submit" value="Add Cat" />
                    </fieldset>
                </form>
            </section>
        );
    }
};

export default CreatePrivateCat;