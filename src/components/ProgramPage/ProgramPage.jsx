import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProgramForm from '../ProgramForm/ProgramForm';
import ProgramList from '../ProgramList/ProgramList';

import Button from '@material-ui/core/Button'


function ProgramPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const program = useSelector(state => state.workout.programReducer)

    const [programDay, setProgramDay] = useState(1)
    const [frequencyToDays, setFrequencyToDays] = useState([]);
    const [exerciseToAddToProgram, setExerciseToAddToProgram] = useState({
        // number_of_weeks: '',
        // start_date: '',
        program_number: 1,
        program_day: programDay,
        exerciseNumberInWorkout: 1,
        exercise_id: '',
        exercise_name: '',
        number_of_sets: '',
        number_of_reps: '',
        weight: ''
    })


    const postProgram = () => {
        dispatch({ type: 'POST_PROGRAM', payload: program });

        history.push('/user');
    }


    return (
        <>
            <div id="program-page">
                <ProgramForm programDay={programDay} setProgramDay={setProgramDay} frequencyToDays={frequencyToDays} setFrequencyToDays={setFrequencyToDays} exerciseToAddToProgram={exerciseToAddToProgram} setExerciseToAddToProgram={setExerciseToAddToProgram}/>
                <ProgramList programDay={programDay} setProgramDay={setProgramDay} frequencyToDays={frequencyToDays} setFrequencyToDays={setFrequencyToDays} exerciseToAddToProgram={exerciseToAddToProgram} setExerciseToAddToProgram={setExerciseToAddToProgram}/>
                <Button onClick={postProgram}>Create Program</Button>
            </div>
        </>
    )
}

export default ProgramPage;