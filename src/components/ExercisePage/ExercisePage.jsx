import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function ExercisePage() {

    const dispatch = useDispatch();
    const workoutId = useParams().workoutId;
    const exerciseNumber = useParams().exerciseNumber;

    // const dispatch = useDispatch();
    const exerciseList = useSelector(state => state.workout.exerciseList)

    console.log('exerciseList on Exercise Page', exerciseList);
    console.log('workoutId on Exercise Page', workoutId);
    console.log('exerciseNumber on Exercise Page', exerciseNumber);


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