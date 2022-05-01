import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';

import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

function MaxItem({ max }) {

    const dispatch = useDispatch();

    const concernedElement = document.querySelector('.click-text');

    const [maxWeight, setMaxWeight] = useState('');
    const [open, setOpen] = useState(false);




    const useStyles = makeStyles((theme) => ({
        root: {
            position: 'relative',
        },
    }));

    const classes = useStyles();

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);

        if(maxWeight != '') {
            dispatch({type: 'UPDATE_MAX_WEIGHT', payload: {maxId: max.id, maxWeight: maxWeight} })
        } 
    };

    const handleFavorite = () => {

        dispatch({ type: 'UPDATE_FAVORITE', payload: max })

    }

    document.addEventListener('mousedown', (event) => {
        if (concernedElement?.contains(event.target)) {
            console.log('Clicked Inside');
        } else {
            console.log('Clicked Outside / Elsewhere');
        }
    });


    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                <h3>{max.name_of_exercise}<span> {max.favorite ? <Star color='primary' onClick={handleFavorite}></Star> : <StarBorder color='primary' onClick={handleFavorite}></StarBorder>}</span></h3>
                    {open ? (
                        <div >
                            <TextField type='number' label={max.weight} variant='standard' onChange={(event) => {setMaxWeight(event.target.value)}} onBlur={() => {handleClickAway()}} />
                        </div>
                    ) : <p onClick={handleClick}>{max.weight}</p>}
                </div>
            </ClickAwayListener>
        </>
    )
}

export default MaxItem;