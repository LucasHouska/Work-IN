import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function ExercisePage() {

    const dispatch = useDispatch();

    const workoutId = useParams().workoutId;
    const exerciseNumber = useParams().exerciseNumber;
    const exerciseList = useSelector(state => state.workout.exerciseList)
    

    useEffect(() => {
        dispatch({ type: `GET_WORKOUT`, payload: { workoutId, exerciseNumber } }) //
    }, [])

    return (
        <>
            <h1>Hello!</h1>
            <ul>
                {exerciseList.map(exercise => {
                    return (
                        <>
                            <li>{exercise.exercise_id}</li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default ExercisePage;