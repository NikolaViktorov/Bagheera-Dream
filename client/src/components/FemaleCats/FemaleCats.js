import { useState, useEffect } from 'react'
import * as catsService from '../../services/catsService'

const FemaleCats = () => {

    const [cats, setCats] = useState(catsService.getFemaleCats());

    useEffect(() => {
        // fill cats
    })
    return (
        <h1>
            Hello
        </h1>
    );
}

export default FemaleCats;

