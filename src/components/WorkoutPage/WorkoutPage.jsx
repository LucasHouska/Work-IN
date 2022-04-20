import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

import WorkoutList from "../WorkoutList/WorkoutList";
import WorkoutForm from "../WorkoutForm/WorkoutForm";


function WorkoutPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const workout = useSelector(state => state.workout.workoutReducer);
    const workoutId = useSelector(state => state.workout.workoutId);




    const postWorkout = () => {

        dispatch({ type: 'POST_WORKOUT', payload: workout })

    }

    if(workoutId != 0) {
        history.push(`/exercise/${workoutId}/0`)
    }




    return (
        <>
            <div>
                <WorkoutForm />
                <WorkoutList />
                <Button variant="contained" color="primary" onClick={postWorkout}>Begin</Button>
            </div>
        </>
    )
}

export default WorkoutPage;