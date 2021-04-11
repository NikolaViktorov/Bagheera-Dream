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
            <div className="catContainer">
                {
                    this.state.cats.map(c => <FemaleCat key={c.CatId} CatId={c.CatId} Age={c.Age} ProfileImage={c.ProfileImage} Name={c.Name}/>)
                }
            </div>
        );
    }

}

export default FemaleCats;

