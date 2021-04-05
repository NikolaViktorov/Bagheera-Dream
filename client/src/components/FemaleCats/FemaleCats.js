import { useState, useEffect } from 'react'
import * as catsService from '../../services/catsService'
import { Component } from 'react';
import FemaleCat from './FemaleCat';

class FemaleCats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: []
        }
    }

    async componentDidMount() {
        this.setState({
            cats: await catsService.getPrivateCats('Female'),
        });
    }

    render() {
        return (
            <h1>
                {
                    this.state.cats.map(c => <FemaleCat key={c.CatId} Age={c.Age} ProfileImage={c.ProfileImage} Name={c.Name}/>)
                }
            </h1>
        );
    }

}

export default FemaleCats;

