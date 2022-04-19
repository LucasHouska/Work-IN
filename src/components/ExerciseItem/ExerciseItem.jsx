import { useDispatch } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


function ExerciseItem({exercise}) {

    const dispatch = useDispatch();

    const handleDelete = (exercise) => {
        console.log('exercise:', exercise)
        dispatch({ type: 'DELETE_EXERCISE_FROM_WORKOUT', payload: exercise.exerciseNumberInWorkout })
    }

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {exercise.exercise_name}
                </TableCell>
                <TableCell align="center">{exercise.number_of_sets}</TableCell>
                <TableCell align="center">{exercise.number_of_reps}</TableCell>
                <TableCell align="center">{exercise.weight}</TableCell>
                <TableCell align="center"><Button variant='contained' color='secondary' onClick={() => { handleDelete(exercise) }}>Delete</Button></TableCell>
            </TableRow>
        </>
    )
}

export default ExerciseItem;