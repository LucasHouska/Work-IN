import { useEffect, useState } from 'react';
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
import ExerciseItem from '../ExerciseItem/ExerciseItem';




function ExercisePage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const workoutId = Number(useParams().workoutId);
    const index = Number(useParams().exerciseNumber);
    const exerciseList = useSelector(state => state.workout.exerciseList);
    // const workoutId = useSelector(state => state.workout.workoutId)

    const [currentExercise, setCurrentExercise] = useState([]);

    const [lastExercise, setLastExercise] = useState(false);

    // console.log('Current Exercise', currentExercise);
    // console.log('workoutId', workoutId);




    const handleNextExercise = () => {
        history.push(`/exercise/${workoutId}/${index + 1}/`)
    }

    const handleFinish = () => {
        history.push('/finish');
    }


    //In case the user deletes an exercise in the WorkoutList, this function 
    //ensures that the exercises will still render in order written
    const exerciseOrder = () => {
        let exerciseNumbersInOrder = [];
        let temporaryCurrentExercise = [];
        let count = 1;

        for (const exercise of exerciseList) {
            if (exerciseNumbersInOrder.includes(exercise.exercise_number_in_workout) === false) {
                exerciseNumbersInOrder.push(exercise.exercise_number_in_workout)
                count = count++;
            }
            else {
                count = count++;
            }
        }

        for (const exercise of exerciseList) {
            if (exercise.exercise_number_in_workout === exerciseNumbersInOrder[index]) {
                console.log(exercise)

                temporaryCurrentExercise.push(exercise);

            }

        }

        setCurrentExercise(temporaryCurrentExercise);

        if (index === (exerciseNumbersInOrder.length - 1)) {
            setLastExercise(true);
        }

        console.log('exerciseNumbersInOrder', exerciseNumbersInOrder);

    }


    useEffect(() => {

        exerciseOrder();

    }, [exerciseList])


    useEffect(() => {
        dispatch({ type: `GET_WORKOUT`, payload: workoutId });

    }, [workoutId])




    return (
        <>
            <h1>{currentExercise[0]?.exercise_name.toUpperCase()}</h1>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sets</TableCell>
                            <TableCell align="center">Reps&nbsp;</TableCell>
                            <TableCell align="center">Weight&nbsp;</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentExercise && currentExercise.map((exercise) => (
                            <ExerciseItem
                                key={exercise?.id}
                                exercise={exercise}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {lastExercise ? <Button onClick={handleFinish}>Finish</Button> : <Button onClick={handleNextExercise}>Next Exercise</Button>}
        </>
    )
}

export default ExercisePage;