import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

function WorkoutForm() {

    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exercises)

    const [exerciseToAddToWorkout, setExerciseToAddToWorkout] = useState({
        exercise_id: '',
        exercise_name: '',
        number_of_sets: '',
        number_of_reps: '',
        weight: ''
    })

    const addExerciseToWorkout = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_EXERCISE_TO_WORKOUT', payload: exerciseToAddToWorkout });

        setExerciseToAddToWorkout({
            exercise_id: '',
            exercise_name: '',
            number_of_sets: '',
            number_of_reps: '',
            weight: ''
        })
    }

    const handleExerciseInput = (event, value) => {
        console.log(value)

        setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, exercise_id: value.id, exercise_name: value.exercise_name })
    }

    console.log(exerciseToAddToWorkout)

    useEffect(() => {
        dispatch({ type: 'GET_EXERCISES' })
    }, []);

    return (
        <>
            <form onSubmit={addExerciseToWorkout}>
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