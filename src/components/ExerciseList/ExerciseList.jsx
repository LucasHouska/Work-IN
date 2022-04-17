import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function WorkoutList() {

    const workout = useSelector(state => state.workout.workoutReducer)

    console.log('workout', workout)

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workout.map((exercise) => (
                            <TableRow key={exercise.exercise_id}>
                                <TableCell component="th" scope="row">
                                    {exercise.exercise_name}
                                </TableCell>
                                <TableCell align="right">{exercise.number_of_sets}</TableCell>
                                <TableCell align="right">{exercise.number_of_reps}</TableCell>
                                <TableCell align="right">{exercise.weight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default WorkoutList;