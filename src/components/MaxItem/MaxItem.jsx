import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';

import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

function MaxItem({ max }) {

    const dispatch = useDispatch();

    const concernedElement = document.querySelector(".click-text");

    const [edit, setEdit] = useState(true)



    const useStyles = makeStyles((theme) => ({
        root: {
            position: 'relative',
        },
        // dropdown: {
        //     position: 'absolute',
        //     top: 28,
        //     right: 0,
        //     left: 0,
        //     zIndex: 1,
        //     border: '1px solid',
        //     // padding: theme.spacing(1),
        //     backgroundColor: theme.palette.background.paper,
        // },
    }));




    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleFavorite = () => {

        dispatch({ type: 'UPDATE_FAVORITE', payload: max })

    }

    const handleEditWeight = () => {
        setEdit(false)
    }

    const handleSaveWeight = () => {
        setEdit(true)
    }

    document.addEventListener("mousedown", (event) => {
        if (concernedElement?.contains(event.target)) {
            console.log("Clicked Inside");
        } else {
            console.log("Clicked Outside / Elsewhere");
        }
    });


    return (
        <>
            {/* <div className="max-item">
                <h3>{max.name_of_exercise}<span> {max.favorite ? <Star color="primary" onClick={handleFavorite}></Star> : <StarBorder color="primary" onClick={handleFavorite}></StarBorder>}</span></h3>
                {edit ? <p onClick={handleEditWeight}>{max.weight}</p> : <TextField type="number" label="New Max" variant="standard" onBlur={handleSaveWeight} />}

            </div> */}
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                <h3>{max.name_of_exercise}<span> {max.favorite ? <Star color="primary" onClick={handleFavorite}></Star> : <StarBorder color="primary" onClick={handleFavorite}></StarBorder>}</span></h3>
                {/* <p onClick={handleClick}>{max.weight}</p> */}
                    {open ? (
                        <div >
                            <TextField type="number" label="New Max" variant="standard" onBlur={handleSaveWeight} />
                        </div>
                    ) : <p onClick={handleClick}>{max.weight}</p>}
                </div>
            </ClickAwayListener>
        </>
    )
}

export default MaxItem;