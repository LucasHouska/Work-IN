import { useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import WorkoutItem from '../WorkoutItem/WorkoutItem';

function WorkoutList() {

    const workout = useSelector(state => state.workout.workoutReducer)

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
                            <WorkoutItem 
                            key={exercise.exercise_id}
                            exercise = {exercise}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default WorkoutList;