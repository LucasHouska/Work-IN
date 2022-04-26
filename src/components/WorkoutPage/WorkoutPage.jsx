import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import WorkoutList from "../WorkoutList/WorkoutList";
import WorkoutForm from "../WorkoutForm/WorkoutForm";


function WorkoutPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const workout = useSelector(state => state.workout.workoutReducer);
    const program = useSelector(state => state.workout.programReducer);

    const [programExercises, setProgramExercises] = useState([]);
    const [programDays, setProgramDays] = useState([]);
    const [programDay, setProgramDay] = useState(0);



    const postWorkout = () => {
        console.log('workout in front end of post', workout)

        dispatch({ type: 'POST_WORKOUT', payload: workout, callback: moveToExercise })

    }

    const moveToExercise = (workoutId) => {
        history.push(`/exercise/${workoutId}/0`)
    }

    const handleDayChange = (event) => {
        const day = Number(event.target.value)

        setProgramDay(day);
    };

    console.log('program exercises', programExercises);



    useEffect(() => {

        console.log('works?')
        let exercisesForProgramDay = [];

        for (const exercise of program) {
            if (exercise.program_day === programDay) {
                exercisesForProgramDay.push(exercise);
            }
        }

        setProgramExercises(exercisesForProgramDay);

        dispatch({ type: 'EXERCISES_FOR_PROGRAM_DAY', payload: exercisesForProgramDay })

    }, [programDay])


    useEffect(() => {
        let numberOfDays = [];

        for (const day of program) {
            if (numberOfDays.includes(day.program_day) === false) {
                numberOfDays.push(day.program_day);
            }
        }

        setProgramDays(numberOfDays)

    }, [program])


    useEffect(() => {
        dispatch({ type: 'GET_PROGRAM' })
    }, []);


    return (
        <>
            <div id="workout-page">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Program Day</FormLabel>
                    <RadioGroup row aria-label="Day" name="day" value={Number(programDay)} onChange={handleDayChange}>
                        {programDays.map((day, i) => {
                            return (
                                <FormControlLabel key={i} labelPlacement="top" value={day} control={<Radio />} label={day} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
                <h2>OR</h2>
                <WorkoutForm />
                <WorkoutList programDay={programDay} />
                <div className="begin">
                    <Button variant="contained" color="primary" style={{ margin: 20 }} onClick={postWorkout}>Begin</Button>
                </div>
            </div>
        </>
    )
}

export default WorkoutPage;