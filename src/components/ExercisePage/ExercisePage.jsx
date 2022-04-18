import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


function ExercisePage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const workoutId = Number(useParams().workoutId);
    const exerciseNumber = Number(useParams().exerciseNumber);
    const exerciseList = useSelector(state => state.workout.exerciseList)


    const handleNextExercise = () => {
        history.push(`/exercise/${workoutId}/${exerciseNumber + 1}`)
    }


    useEffect(() => {
        dispatch({ type: `GET_WORKOUT`, payload: { workoutId, exerciseNumber } }) //
    }, [])

    return (
        <>
            <h1>{exerciseList[0]?.exercise_name.toUpperCase()}</h1>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sets</TableCell>
                            <TableCell align="center">Reps&nbsp;</TableCell>
                            <TableCell align="center">Weight&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exerciseList && exerciseList.map((exercise) => (
                            <TableRow key={exercise.id}>
                                <TableCell align="center">{exercise.set_number}</TableCell>
                                <TableCell align="center">{exercise.repetitions}</TableCell>
                                <TableCell align="center">{exercise.weight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button onClick={handleNextExercise}>Next Exercise</Button>
        </>
    )
}

export default ExercisePage;