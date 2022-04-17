import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

import ExerciseList from "../ExerciseList/ExerciseList";
import WorkoutForm from "../WorkoutForm/WorkoutForm";


function WorkoutPage() {

    const history = useHistory();

    const dispatch = useDispatch();
    const workout = useSelector(state => state.workout.workoutReducer);
    const workoutId = useSelector(state => state.workout.workoutId);

    // used for keeping track of exercise order; used in WorkoutForm
    let exerciseNumberInWorkout = 1;

    const postWorkout = () => {
        exerciseNumberInWorkout = 1;

        dispatch({ type: 'POST_WORKOUT', payload: workout })
    }

    if (workoutId != 0) {
        history.push(`/exercise/${workoutId}/1`) //useParams?
    }

    return (
        <>
            <div>
                <WorkoutForm
                    exerciseNumberInWorkout={exerciseNumberInWorkout}
                />
                <ExerciseList />
                <Button variant="contained" color="primary" onClick={postWorkout}>Begin</Button>
            </div>
        </>
    )
}

export default WorkoutPage;