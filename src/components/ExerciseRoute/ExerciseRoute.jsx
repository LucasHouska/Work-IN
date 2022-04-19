import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function ExerciseRoute() {

    const history = useHistory();

    const workoutId = useSelector(state => state.workout.workoutId);

    if (workoutId != 0) {
        //useParams on Exercise Page
        history.push(`/exercise/${workoutId}/0`)
    }

    return (
        <>

        </>
    )
}

export default ExerciseRoute;