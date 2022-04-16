import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import {Autocomplete} from '@material-ui/lab';

function WorkoutForm() {

    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exercises)

    const flatProps = {
        options: exercises.map((option) => option.exercise_name),
      };

      useEffect(() => {
          dispatch({type: 'GET_EXERCISES'})
      }, []);

    return (
        <>
            <form>
                <Autocomplete 
                {...flatProps}
                id="exercise-options"
                renderInput={(params) => <TextField {...params} label="Exercises" margin="normal" />}
                />
            </form>
        </>
    )
}

export default WorkoutForm;