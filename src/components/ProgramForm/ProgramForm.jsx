import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';




function ProgramForm({ exerciseToAddToProgram, setExerciseToAddToProgram }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const exercises = useSelector(store => store.exercises.exerciseReducer);
    const program = useSelector(store => store.workout.programReducer)
    const exerciseNumber = useSelector(store => store.workout.exerciseNumber);
    const user = useSelector(store => store.user);
    const time = useSelector(store => store.workout.weeksReducer)

    const programDay = time.programDay




    const addExerciseToProgram = (event) => {
        event.preventDefault();

        dispatch({ type: 'ADD_EXERCISE_TO_PROGRAM', payload: exerciseToAddToProgram });


        setExerciseToAddToProgram({
            //In case I want to add a time-keeper for users
            // number_of_weeks: time.weeks,
            // start_date: time.startDate,
            program_day: programDay,
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
        setExerciseToAddToProgram({ ...exerciseToAddToProgram, exercise_id: value.id, exercise_name: value.exercise_name })
    };

    const handleFrequencyChange = (event) => {
        dispatch({ type: 'HOLD_FREQUENCY', payload: Number(event.target.value) })
    }

    //In case I want to add a time-keeper for users
    // const handleChangeWeeks = (event) => {
    //     let weeks = Number(event.target.value);

    //     setExerciseToAddToProgram({ ...exerciseToAddToProgram, number_of_weeks: weeks });

    //     // numberOfWeeks = weeks;

    //     dispatch({ type: 'HOLD_WEEKS', payload: weeks })

    // }


    const goToCreateExercise = () => {
        history.push('/create-exercise')
    };

    // This useEffect GETS the exercises for the Autocomplete and the program for
    //the table
    useEffect(() => {
        dispatch({ type: 'GET_EXERCISES' })
        dispatch({ type: 'GET_PROGRAM' })
    }, []);

    // This useEffect fills the frequency input should there already be a program
    useEffect(() => {
        let programDays = [];

        for (let day of program) {
            if (programDays.includes(day.program_day) === false) {
                programDays.push(day.program_day);
            }
        }
        // setFrequencyToDays(programDays);

        dispatch({ type: 'HOLD_FREQUENCY', payload: programDays.length })
    }, [program]);

    return (
        <>
            <form className="program-form" onSubmit={addExerciseToProgram}>
                <div className="time-inputs">
                    {/* <TextField id="number-of-weeks" type="number" label="Weeks" style={{ width: 70 }} value={time.weeks} variant="standard" onChange={handleChangeWeeks} />
                    <TextField id="start-date" type="date" label="Start Date" InputLabelProps={{ shrink: true }} value={time.startDate} variant="standard" onChange={event => { dispatch({ type: 'HOLD_START_DATE', payload: event.target.value }) }} /> */}
                    <TextField id="frequency" InputProps={{ inputProps: { min: 0, max: 7 } }} style={{ width: 100 }} type="number" label="Frequency" value={time.frequency} variant="standard" onChange={handleFrequencyChange} />
                </div>
                <Autocomplete
                    id="exercise-options"
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
                    onChange={handleExerciseInput}
                    renderInput={(params) => <TextField {...params} label="Exercises" margin="normal" />}
                />
                <div className='form-inputs'>
                    <TextField id="number-of-sets" type="number" label="Sets" value={exerciseToAddToProgram.number_of_sets} variant="standard" onChange={event => setExerciseToAddToProgram({ ...exerciseToAddToProgram, number_of_sets: Number(event.target.value) })} />
                    <TextField id="number-of-reps" type="number" label="Reps" value={exerciseToAddToProgram.number_of_reps} variant="standard" onChange={event => setExerciseToAddToProgram({ ...exerciseToAddToProgram, number_of_reps: Number(event.target.value) })} />
                    <TextField id="weight" type="number" label="Target Weight" value={exerciseToAddToProgram.weight} variant="standard" onChange={event => setExerciseToAddToProgram({ ...exerciseToAddToProgram, weight: Number(event.target.value) })} />
                </div>
                <div id="program-buttons">
                    <Button className="button" variant="contained" color="primary" style={{ margin: 10 }} type="submit">Add Exercise</Button>
                    {user.access_level > 0 && <Button variant="contained" color="default" style={{ margin: 10 }} onClick={goToCreateExercise}>Create a new Exercise</Button>}
                </div>
            </form>
        </>
    )
}

export default ProgramForm;