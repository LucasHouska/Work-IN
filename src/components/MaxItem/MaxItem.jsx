import {useState} from 'react';
import {useDispatch} from 'react-redux';

import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

function MaxItem({ max }) {

    const dispatch = useDispatch();

    const handleFavorite = () => {

        dispatch({type: 'UPDATE_FAVORITE', payload: max})

    }

    return (
        <>
            <div className="max-item">
                <h3>{max.name_of_exercise}<span> {max.favorite ? <Star color="primary" onClick={handleFavorite}></Star> : <StarBorder color="primary" onClick={handleFavorite}></StarBorder>}</span></h3>
                <p>{max.weight}</p>
            </div>
        </>
    )
}

export default MaxItem;