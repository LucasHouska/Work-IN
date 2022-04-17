import {useDispatch, useSelector} from 'react-redux';

import {Button} from '@material-ui/core';

import ExerciseList from "../ExerciseList/ExerciseList";
import WorkoutForm from "../WorkoutForm/WorkoutForm";


function WorkoutPage() {

    const dispatch = useDispatch();
    const workout = useSelector(state => state.workout)

    const postWorkout = () => {
        dispatch({type: 'POST_WORKOUT', payload: workout})
    }

    return (
        <>
            <WorkoutForm />
            <ExerciseList />
            <Button variant="contained" color="primary" onClick={postWorkout}>Begin</Button>
        </>
    )
}

export default WorkoutPage;