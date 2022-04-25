import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';




function ProgramForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const exercises = useSelector(state => state.exercises.exerciseReducer);
    const exerciseNumber = useSelector(state => state.workout.exerciseNumber);
    const user = useSelector(store => store.user);

    // let numberOfWeeks = 0;

    const [programDay, setProgramDay] = useState(1)
    const [frequencyToDays, setFrequencyToDays] = useState([]);

    const [exerciseToAddToProgram, setExerciseToAddToProgram] = useState({
        number_of_weeks: '',
        start_date: '',
        program_day: programDay,
        exerciseNumberInWorkout: 1,
        exercise_id: '',
        exercise_name: '',
        number_of_sets: '',
        number_of_reps: '',
        weight: ''
    })




    const addExerciseToProgram = (event) => {
        event.preventDefault();

        dispatch({ type: 'ADD_EXERCISE_TO_PROGRAM', payload: exerciseToAddToProgram });

        setExerciseToAddToProgram({
            number_of_weeks: '',
            start_date: '',
            program_day: programDay,
            exerciseNumberInWorkout: exerciseNumber,
            exercise_id: '',
            exercise_name: '',
            number_of_sets: '',
            number_of_reps: '',
            weight: ''
        })

        console.log('program workout', exerciseToAddToProgram)

        dispatch({ type: 'ADD_TO_EXERCISE_NUMBER' })

    }

    const handleExerciseInput = (event, value) => {
        setExerciseToAddToProgram({ ...exerciseToAddToProgram, exercise_id: value.id, exercise_name: value.exercise_name })
    };

    const handleFrequencyChange = (event) => {

        let renderFrequency = Number(event.target.value) + 1;
        let programDays = [];

        for (let i = 1; i < renderFrequency; i++) {
            programDays.push(i);
        }
        setFrequencyToDays(programDays);
    }

    const handleDayChange = (event) => {
        const day = Number(event.target.value)

        setProgramDay(day);

        setExerciseToAddToProgram({ ...exerciseToAddToProgram, program_day: day })
    };

    const handleChangeWeeks = (event) => {
        let weeks = Number(event.target.value);

        setExerciseToAddToProgram({ ...exerciseToAddToProgram, number_of_weeks: weeks });

        // numberOfWeeks = weeks;
    }


    const goToCreateExercise = () => {
        history.push('/create-exercise')
    };


    useEffect(() => {
        dispatch({ type: 'GET_EXERCISES' })
    }, []);




    return (
        <>
            <form className="program-form" onSubmit={addExerciseToProgram}>
                <TextField id="number-of-weeks" type="number" label="Weeks" value={exerciseToAddToProgram.number_of_weeks} variant="standard" onChange={handleChangeWeeks} />
                <TextField id="start-date" type="date" label="Start Date" InputLabelProps={{ shrink: true }} value={exerciseToAddToProgram.start_date} variant="standard" onChange={event => setExerciseToAddToProgram({ ...exerciseToAddToProgram, start_date: event.target.value })} />
                <div id="frequency"><TextField id="frequency" type="number" label="Frequency" variant="standard" onChange={handleFrequencyChange} /><h4>/week</h4></div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Day</FormLabel>
                    <RadioGroup row aria-label="Day" name="day" value={Number(programDay)} onChange={handleDayChange}>
                        {frequencyToDays && frequencyToDays.map((day, i) => {
                            return (
                                <FormControlLabel key = {i}  labelPlacement="top" value={day} control={<Radio />} label={day}/>
                            )
                        })}
                    </RadioGroup>
                </FormControl>
                <Autocomplete
                    id="exercise-options"
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
                    onChange={handleExerciseInput}
                    renderInput={(params) => <TextField {...params} label="Exercises" margin="normal" />}
                />
                <TextField id="number-of-sets" type="number" label="Sets" value={exerciseToAddToProgram.number_of_sets} variant="standard" onChange={event => setExerciseToAddToProgram({ ...exerciseToAddToProgram, number_of_sets: Number(event.target.value) })} />
                <TextField id="number-of-reps" type="number" label="Reps" value={exerciseToAddToProgram.number_of_reps} variant="standard" onChange={event => setExerciseToAddToProgram({ ...exerciseToAddToProgram, number_of_reps: Number(event.target.value) })} />
                <TextField id="weight" type="number" label="Target Weight" value={exerciseToAddToProgram.weight} variant="standard" onChange={event => setExerciseToAddToProgram({ ...exerciseToAddToProgram, weight: Number(event.target.value) })} />
                <Button variant="contained" type="submit">Add Exercise</Button>
                {user.access_level > 0 && <Button variant="contained" onClick={goToCreateExercise}>Create a new Exercise</Button>}
            </form>
        </>
    )
}

export default ProgramForm;