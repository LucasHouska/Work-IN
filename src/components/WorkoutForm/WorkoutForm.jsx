import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Swal from 'sweetalert2';




function WorkoutForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const exercises = useSelector(state => state.exercises.exerciseReducer);
    const exerciseNumber = useSelector(state => state.workout.exerciseNumber);
    const user = useSelector(store => store.user);


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


        if (exerciseToAddToWorkout.exercise_name == "") {
            Swal.fire(
                'Hold the phone...',
                'Please enter a new exercise'
            )
        } else {

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
    }

    const handleExerciseInput = (event, value) => {
        setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, exercise_id: value.id, exercise_name: value.exercise_name })
    }

    const clearWorkout = () => {
        dispatch({ type: 'CLEAR_WORKOUT' })
        dispatch({ type: 'GET_PROGRAM' })
    }

    const goToCreateExercise = () => {
        history.push('/create-exercise')
    }


    useEffect(() => {
        dispatch({ type: 'GET_EXERCISES' })
    }, []);




    return (
        <>
            <form id='workout-form' onSubmit={addExerciseToWorkout}>
                <Autocomplete
                    id='exercise-options'
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
                    onChange={handleExerciseInput}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label='Exercises' />}
                />
                <br />

                <div className='form-inputs'>
                    <TextField id='number-of-sets' type='number' label='Sets' value={exerciseToAddToWorkout.number_of_sets} variant='standard' onChange={event => setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, number_of_sets: Number(event.target.value) })} />
                    <TextField id='number-of-reps' type='number' label='Reps' value={exerciseToAddToWorkout.number_of_reps} variant='standard' onChange={event => setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, number_of_reps: Number(event.target.value) })} />
                    <TextField id='weight' type='number' label='Target Weight' value={exerciseToAddToWorkout.weight} variant='standard' onChange={event => setExerciseToAddToWorkout({ ...exerciseToAddToWorkout, weight: Number(event.target.value) })} />
                </div>
                <Button variant='contained' color='primary' type='submit' style={{ margin: 10 }}>Add Exercise</Button>
                <Button variant='outlined' color='default' onClick={clearWorkout}>Clear</Button>
                {user.access_level > 0 &&
                    <div>
                        <Button variant='contained' color='primary' style={{ margin: 10 }} onClick={goToCreateExercise}>Create a new Exercise</Button>
                    </div>}
            </form>
        </>
    )
}

export default WorkoutForm;