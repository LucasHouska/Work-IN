import { useState } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import SaveOutlined from '@material-ui/icons/SaveOutlined';


function ExerciseItem({ exercise }) {

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);

    const [setToUpdate, setSetToUpdate] = useState({
        id: exercise.id,
        reps: exercise.repetitions,
        weight: exercise.weight
    })



    //Deletes set from DB in workout Saga
    const handleDelete = (exercise) => {
        dispatch({ type: 'DELETE_SET', payload: exercise.id });
    }

    //Renders inputs
    const handleEdit = () => {
        setEdit(true);
    }

    //Unrenders inputs and sends Put through workout Saga
    const handleSave = () => {
        setEdit(false);

        dispatch({ type: 'UPDATE_SET', payload: setToUpdate })
    }


    return (
        <>
            {edit ?
                <TableRow>
                    <TableCell align='center'>{exercise?.set_number}</TableCell>
                    <TableCell align='center'><TextField variant='outlined' label={exercise?.repetitions} onChange={(event) => setSetToUpdate({ ...setToUpdate, reps: event.target.value })} /></TableCell>
                    <TableCell align='center'><TextField variant='outlined' label={exercise?.weight} onChange={(event) => setSetToUpdate({ ...setToUpdate, weight: event.target.value })} /></TableCell>
                    <TableCell align='center'>
                        <IconButton aria-label='delete' onClick={handleSave}>
                            <SaveOutlined fontSize='medium' />
                        </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                        <IconButton aria-label='delete' onClick={() => { handleDelete(exercise) }}>
                            <Delete fontSize='medium' />
                        </IconButton>
                    </TableCell>
                </TableRow>
                :
                <TableRow>
                    <TableCell align='center'>{exercise?.set_number}</TableCell>
                    <TableCell align='center'>{exercise?.repetitions}</TableCell>
                    <TableCell align='center'>{exercise?.weight}</TableCell>
                    <TableCell align='center'>
                        <IconButton aria-label='edit' onClick={handleEdit}>
                            <Edit fontSize='medium' />
                        </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                        <IconButton aria-label='delete' onClick={() => { handleDelete(exercise) }}>
                            <Delete fontSize='medium' />
                        </IconButton>
                    </TableCell>
                </TableRow>}
        </>
    )
}

export default ExerciseItem;