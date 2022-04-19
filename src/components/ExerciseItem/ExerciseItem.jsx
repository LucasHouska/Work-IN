import { useState } from 'react';
import {useDispatch} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


function ExerciseItem({ exercise }) {

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [setToUpdate, setSetToUpdate] = useState({
        id: exercise.id,
        reps: exercise.repetitions,
        weight: exercise.weight
    })



    
    const handleDelete = (exercise) => {
        dispatch({ type: 'DELETE_SET', payload: exercise.id })
    }


    const handleEdit = () => {
        setEdit(true);
    }


    const handleSave = () => {
        setEdit(false);

        dispatch({type: 'UPDATE_SET', payload: setToUpdate})
    }


    return (
        <>
            {edit ?
                <TableRow>
                    <TableCell align="center">{exercise?.set_number}</TableCell>
                    <TableCell align="center"><TextField variant='outlined' label={exercise?.repetitions} onChange={(event) => setSetToUpdate({...setToUpdate, reps: event.target.value})} /></TableCell>
                    <TableCell align="center"><TextField variant='outlined' label={exercise?.weight} onChange={(event) => setSetToUpdate({...setToUpdate, weight: event.target.value})} /></TableCell>
                    <TableCell align="right"><Button variant="contained" color="default" onClick={handleSave}>Save</Button></TableCell>
                    <TableCell align="center"><Button variant="contained" color="secondary" onClick={() => { handleDelete(exercise) }}>Delete</Button></TableCell>
                </TableRow>
                :
                <TableRow>
                    <TableCell align="center">{exercise?.set_number}</TableCell>
                    <TableCell align="center">{exercise?.repetitions}</TableCell>
                    <TableCell align="center">{exercise?.weight}</TableCell>
                    <TableCell align="right"><Button variant="contained" color="default" onClick={handleEdit}>Edit</Button></TableCell>
                    <TableCell align="center"><Button variant="contained" color="secondary" onClick={() => { handleDelete(exercise) }}>Delete</Button></TableCell>
                </TableRow>}
        </>
    )
}

export default ExerciseItem;