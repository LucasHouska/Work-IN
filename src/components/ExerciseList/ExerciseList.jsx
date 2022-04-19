import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function WorkoutList() {

    const dispatch = useDispatch();

    const workout = useSelector(state => state.workout.workoutReducer)

    const handleDelete = (exercise) => {
        console.log('exercise:', exercise)
        dispatch({type: 'DELETE_EXERCISE_FROM_WORKOUT', payload: exercise.exerciseNumberInWorkout})
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Exercise</TableCell>
                            <TableCell align="right">Sets</TableCell>
                            <TableCell align="right">Reps&nbsp;</TableCell>
                            <TableCell align="right">Weight&nbsp;</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workout.map((exercise) => (
                            <TableRow key={exercise.exercise_id}>
                                <TableCell component="th" scope="row">
                                    {exercise.exercise_name}
                                </TableCell>
                                <TableCell align="center">{exercise.number_of_sets}</TableCell>
                                <TableCell align="center">{exercise.number_of_reps}</TableCell>
                                <TableCell align="center">{exercise.weight}</TableCell>
                                <TableCell align="center"><Button variant='contained' color='secondary' onClick={() => {handleDelete(exercise)}}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default WorkoutList;