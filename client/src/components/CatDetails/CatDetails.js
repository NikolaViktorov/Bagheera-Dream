import * as catsService from '../../services/catsService';

import { Component } from 'react';

class CatDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cat: {}
        }
    }

    async componentDidMount() {
        const catId = this.props.match.params.id;

        const cat = await catsService.getCatDetails(catId);

        this.setState({
            cat: cat
        });
    }

    returnDetails() {
        if (this.state.cat.ProfileImage === undefined) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className="catDetailsMain">
                    <img className="catsImage" src={require("../../catImages/" + this.state.cat.ProfileImage).default} />
                    <h1 className="catsName">{this.state.cat.Name}</h1>
                    <p>
                        {this.state.cat.Name} is a {this.state.cat.Breed.split('_')[0].toLowerCase() + ' ' + this.state.cat.Breed.split('_')[1].toLowerCase()}
                        &nbsp;with {this.state.cat.Color.toLowerCase()} color. {this.state.cat.Gender === 'Male' ? 'He' : 'She'} is part of the Bagheera's Dream cattery.
                    </p>
                </div>
            );
        }
    }

    render() {
        return (
            this.returnDetails()
        );
    }
}

export default CatDetails;