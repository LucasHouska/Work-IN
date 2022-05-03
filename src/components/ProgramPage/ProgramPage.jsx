import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProgramForm from '../ProgramForm/ProgramForm';
import ProgramList from '../ProgramList/ProgramList';

import Button from '@material-ui/core/Button'


function ProgramPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const program = useSelector(state => state.workout.programReducer);
    const time = useSelector(store => store.workout.weeksReducer);


    const [programDay, setProgramDay] = useState(1)
    const [frequencyToDays, setFrequencyToDays] = useState([]);
    // const [edit, setEdit] = useState(false);
    const [programExists, setProgramExists] = useState(false);
    const [editProgramItem, setEditProgramItem] = useState(false);
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

    // const handleEditProgram = () => {
    //     setEdit(true);
    // }

    // const handleSaveProgram = () => {
    //     dispatch({ type: 'SAVE_PROGRAM', payload: program })
    //     setEdit(false);
    // }

    // const handleDeleteProgram = () => {
    //     dispatch({ type: 'DELETE_PROGRAM' })
    // }

    const goToProfile = () => {
        dispatch({ type: 'SAVE_PROGRAM', payload: program })

        history.push('/user');
    }



    useEffect(() => {
        if (program[0] && program[0].program_number == 1) {
            setProgramExists(true);
        }
    }, [program])

      //This useEffect turns the frequency number in the workout reducer into
    //an array of numbers for the RadioGroup .map to loop over
    useEffect(() => {
        let programDays = [];
        const frequency = time.frequency;

        for (let i = 0; i < frequency; i++) {
            programDays.push(i + 1);
        }
        setFrequencyToDays(programDays);
    }, [time])


    return (
        <>
            <div id='program-page'>
                <div>
                    <ProgramForm programDay={programDay} setProgramDay={setProgramDay} frequencyToDays={frequencyToDays} setFrequencyToDays={setFrequencyToDays} exerciseToAddToProgram={exerciseToAddToProgram} setExerciseToAddToProgram={setExerciseToAddToProgram} />
                </div>
                <ProgramList editProgramItem={editProgramItem} programDay={programDay} setProgramDay={setProgramDay} frequencyToDays={frequencyToDays} setFrequencyToDays={setFrequencyToDays} exerciseToAddToProgram={exerciseToAddToProgram} setExerciseToAddToProgram={setExerciseToAddToProgram} />
                    <Button onClick={postProgram}>Save Program</Button>
            </div>
        </>
    )
}

export default ProgramPage;