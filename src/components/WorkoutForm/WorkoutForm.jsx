import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

function WorkoutForm() {

    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exercises);
    const exerciseNumber = useSelector(state => state.workout.exerciseNumber);

    // Object template for adding an exercise to the workout
    const [exerciseToAddToWorkout, setExerciseToAddToWorkout] = useState({
        exerciseNumberInWorkout: 1,
        exercise_id: '',
        exercise_name: '',
        number_of_sets: '',
        number_of_reps: '',
        weight: ''
    })


    const addExerciseToWorkout = (event) => {
        event.preventDefault();

        console.log('exerciseNumber', exerciseNumber)

        // exerciseNumberInWorkout lives in WorkoutPage
        //used for keeping track of exercise order
        // exerciseNumberInWorkout = exerciseNumberInWorkout + 1;

        dispatch({ type: 'ADD_EXERCISE_TO_WORKOUT', payload: exerciseToAddToWorkout });

        setExerciseToAddToWorkout({
            exerciseNumberInWorkout: exerciseNumber,
            exercise_id: '',
            exercise_name: '',
            number_of_sets: '',
            number_of_reps: '',
            weight: ''
        })

        dispatch({ type: 'ADD_TO_EXERCISE_NUMBER' })

    }

    const handleExerciseInput = (event, value) => {
        console.log(value)

        setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, exercise_id: value.id, exercise_name: value.exercise_name })
    }

    useEffect(() => {
        dispatch({ type: 'GET_EXERCISES' })
    }, []);

    return (
        <>
            <form className="workout-form" onSubmit={addExerciseToWorkout}>
                <Autocomplete
                    id="exercise-options"
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
                    onChange={handleExerciseInput}
                    renderInput={(params) => <TextField {...params} label="Exercises" margin="normal" />}
                />
                <TextField id="number-of-sets" type="number" label="Sets" value={exerciseToAddToWorkout.number_of_sets} variant="standard" onChange={event => setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, number_of_sets: Number(event.target.value) })} />
                <TextField id="number-of-reps" type="number" label="Reps" value={exerciseToAddToWorkout.number_of_reps} variant="standard" onChange={event => setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, number_of_reps: Number(event.target.value) })} />
                <TextField id="weight" type="number" label="Target Weight" value={exerciseToAddToWorkout.weight} variant="standard" onChange={event => setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, weight: Number(event.target.value) })} />
                <Button variant="contained" type="submit">Add Exercise</Button>
            </form>
        </>
    )
}

export default WorkoutForm;