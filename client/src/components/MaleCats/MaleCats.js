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
            cats: await catsService.getPrivateCats('Male'),
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.cats.map(c => <MaleCat key={c.CatId} CatId={c.CatId} Age={c.Age} ProfileImage={c.ProfileImage} Name={c.Name}/>)
                }
            </div>
        );
    }

}

export default MaleCats;

