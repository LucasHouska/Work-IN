import { useState } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import SaveOutlined from '@material-ui/icons/SaveOutlined';




function WorkoutItem({ exercise }) {

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [exerciseToUpdate, setExerciseToUpdate] = useState({
        exerciseNumberInWorkout: exercise.exerciseNumberInWorkout,
        exercise_id: exercise.exercise_id,
        exercise_name: exercise.exercise_name,
        sets: exercise.number_of_sets,
        reps: exercise.number_of_reps,
        weight: exercise.weight
    })




    const handleDelete = (exercise) => {
        console.log('exercise:', exercise)
        dispatch({ type: 'DELETE_EXERCISE_FROM_WORKOUT', payload: exercise.exerciseNumberInWorkout })
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleSave = () => {
        setEdit(false);

        console.log(exerciseToUpdate);

        dispatch({ type: 'EDIT_WORKOUT', payload: exerciseToUpdate })
    }




    return (
        <>
            {edit ?
                <TableRow>
                    <TableCell component='th' scope='row'> {exercise.exercise_name} </TableCell>
                    <TableCell align='center'><TextField variant='outlined' label={exercise.number_of_sets} onChange={(event) => setExerciseToUpdate({ ...exerciseToUpdate, sets: Number(event.target.value) })} /></TableCell>
                    <TableCell align='center'><TextField variant='outlined' label={exercise.number_of_reps} onChange={(event) => setExerciseToUpdate({ ...exerciseToUpdate, reps: Number(event.target.value) })} /></TableCell>
                    <TableCell align='center'><TextField variant='outlined' label={exercise.weight} onChange={(event) => setExerciseToUpdate({ ...exerciseToUpdate, weight: Number(event.target.value) })} /></TableCell>
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
                    <TableCell component='th' scope='row'> {exercise.exercise_name} </TableCell>
                    <TableCell align='center'>{exercise.number_of_sets}</TableCell>
                    <TableCell align='center'>{exercise.number_of_reps}</TableCell>
                    <TableCell align='center'>{exercise.weight}</TableCell>
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

export default WorkoutItem;