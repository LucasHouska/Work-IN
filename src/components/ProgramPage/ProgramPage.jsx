import { useEffect, useState } from 'react';
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
    const [edit, setEdit] = useState(false);
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
    let isEdit = false;


    const postProgram = () => {
        dispatch({ type: 'POST_PROGRAM', payload: program });

        history.push('/user');
    }

    const handleEditProgram = () => {
        isEdit = true;
        setEdit(true);
    }

    const handleSaveProgram = () => {
        dispatch({ type: 'SAVE_PROGRAM', payload: program })
        isEdit = false;
        setEdit(false);
    }

    const handleDeleteProgram = () => {
        dispatch({ type: 'DELETE_PROGRAM' })
    }

    const goToProfile = () => {
        dispatch({ type: 'SAVE_PROGRAM', payload: program })

        history.push('/user');
    }



    useEffect(() => {
        if (program[0] && program[0].program_number == 1) {
            setProgramExists(true);
        }
    }, [program])


    return (
        <>
            <div id='program-page'>
                <div>
                    <ProgramForm programDay={programDay} setProgramDay={setProgramDay} frequencyToDays={frequencyToDays} setFrequencyToDays={setFrequencyToDays} exerciseToAddToProgram={exerciseToAddToProgram} setExerciseToAddToProgram={setExerciseToAddToProgram} />
                </div>
                <ProgramList edit={edit} setEdit={setEdit} editProgramItem={editProgramItem} programDay={programDay} setProgramDay={setProgramDay} frequencyToDays={frequencyToDays} setFrequencyToDays={setFrequencyToDays} exerciseToAddToProgram={exerciseToAddToProgram} setExerciseToAddToProgram={setExerciseToAddToProgram} />
                {programExists ?
                    <div>
                        <div>
                            {edit ?
                                <Button variant='contained' color='default' style={{ margin: 5 }} onClick={handleSaveProgram}>Save Program</Button>
                                :
                                <Button variant='contained' color='default' style={{ margin: 5 }} onClick={handleEditProgram}>Edit Program</Button>
                            }
                            <Button variant='contained' color='secondary' style={{ margin: 5 }} onClick={handleDeleteProgram}>Delete Program</Button>
                        </div>
                        <div className='button'>
                            <Button variant='contained' color='primary' onClick={goToProfile}>Back to Profile</Button>
                        </div>
                    </div>
                    :
                    <Button onClick={postProgram}>Create Program</Button>
                    }
            </div>
        </>
    )
}

export default ProgramPage;