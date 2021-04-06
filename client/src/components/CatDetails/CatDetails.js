import * as catsService from '../../services/catsService';

import { Component } from 'react';
import { Link } from 'react-router-dom'

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

    async componentDidUpdate() {
        const catId = this.props.match.params.id;
        const cat = await catsService.getCatDetails(catId);

        if (this.state.cat.Name !== cat.Name) {
            this.setState(
                { cat: cat }
            )
            document.body.scrollTop = 0; 
            document.documentElement.scrollTop = 0;
        }
    }

    renderParents() {
        if (this.state.cat.Father !== null && this.state.cat.Mother !== null) {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="parent">
                            <div className="card-image">
                                <img className="img-fluid" src={require("../../catImages/" + this.state.cat.Father.ProfileImage).default} alt="#" />
                            </div>
                            <div className="parent-info">
                                <h3 className="card-title">Father - {this.state.cat.Father.Name}</h3>
                            </div>
                            <div className="button-container">
                                <Link className="btnMore" to={'/cat/' + this.state.cat.Father.CatId}>SEE MORE</Link>
                            </div>
                        </div>

                        <div className="parent">
                            <div className="card-image">
                                <img className="img-fluid" src={require("../../catImages/" + this.state.cat.Mother.ProfileImage).default} alt="#" />
                            </div>
                            <div className="parent-info">
                                <h3 className="card-title">Mother - {this.state.cat.Mother.Name}</h3>
                            </div>
                            <div className="button-container">
                                <Link className="btnMore" to={'/cat/' + this.state.cat.Mother.CatId}>SEE MORE</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
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
                    {this.renderParents()}
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