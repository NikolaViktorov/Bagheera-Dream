import { useState, useEffect } from 'react'
import * as catsService from '../../services/catsService'
import { Component } from 'react';
import MaleCat from './MaleCat';

class MaleCats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: []
        }
    }

    async componentDidMount() {
        this.setState({
            cats: await catsService.getMaleCats(),
        });
    }

    render() {
        return (
            <h1>
                {
                    this.state.cats.map(c => <MaleCat key={c.CatId} Age={c.Age} ProfileImage={c.ProfileImage} Name={c.Name}/>)
                }
            </h1>
        );
    }

}

export default MaleCats;

