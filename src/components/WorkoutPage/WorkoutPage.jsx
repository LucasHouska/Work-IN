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

    const [programDays, setProgramDays] = useState([]);
    const [programDay, setProgramDay] = useState(1);



    const postWorkout = () => {

        dispatch({ type: 'POST_WORKOUT', payload: workout, callback: moveToExercise })

    }

    const moveToExercise = (workoutId) => {
        history.push(`/exercise/${workoutId}/0`)
    }

    const handleDayChange = (event) => {
        const day = Number(event.target.value)

        setProgramDay(day);
    };



    useEffect(() => {
        let numberOfDays = [];

        for (const day of program) {
            console.log(day)
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
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Day</FormLabel>
                    <RadioGroup row aria-label="Day" name="day" value={Number(programDay)} onChange={handleDayChange}>
                        {programDays && programDays.map((day, i) => {
                            return (
                                <FormControlLabel key={i} labelPlacement="top" value={day} control={<Radio />} label={day} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
                <WorkoutForm />
                <WorkoutList />
                <div className="begin">
                    <Button variant="contained" color="primary" onClick={postWorkout}>Begin</Button>
                </div>
            </div>
        </>
    )
}

export default WorkoutPage;