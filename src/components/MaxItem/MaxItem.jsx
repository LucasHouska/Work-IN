import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

function MaxItem({ max, deleteScreen, setDeleteScreen }) {

    const dispatch = useDispatch();

    const concernedElement = document.querySelector('.click-text');

    const [maxWeight, setMaxWeight] = useState('');
    const [open, setOpen] = useState(false);




    const useStyles = makeStyles((theme) => ({
        root: {
            position: 'relative',
            margin: 10
        },
    }));

    const classes = useStyles();


    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);

        //ensures premature dispatches
        if (maxWeight != '') {
            dispatch({ type: 'UPDATE_MAX_WEIGHT', payload: { maxId: max.id, maxWeight: maxWeight } })
        }
    };

    const handleFavorite = () => {

        dispatch({ type: 'UPDATE_FAVORITE', payload: max })

    }

    const handleDelete = () => {
        dispatch({ type: 'DELETE_MAX', payload: max.id})
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
                    <div>
                        {deleteScreen ?
                            <Button variant='contained' color='secondary' onClick={handleDelete}>Delete</Button>
                            :
                            <div>
                                {
                                    open ? (
                                        <div >
                                            <TextField type='number' label={max.weight} variant='standard' onChange={(event) => { setMaxWeight(event.target.value) }} onBlur={() => { handleClickAway() }} />
                                        </div>
                                    ) :
                                        <p onClick={handleClick}>{max.weight}</p>}
                            </div>}
                    </div>
                </div>
            </ClickAwayListener>
        </>
    )
}

export default MaxItem;