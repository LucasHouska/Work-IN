import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProgramForm from '../ProgramForm/ProgramForm';
import ProgramList from '../ProgramList/ProgramList';

import Button from '@material-ui/core/Button'


function ProgramPage() {

    const dispatch = useDispatch();

    const program = useSelector(state => state.workout.programReducer)

    const [programDay, setProgramDay] = useState(1)

    const postProgram = () => {
        dispatch({ type: 'POST_PROGRAM', payload: program, callback: moveToProfile });
    }

    const moveToProfile = () => {
        history.push(`/user`);
    }


    return (
        <>

            <ProgramForm programDay={programDay} setProgramDay={setProgramDay} />
            <ProgramList programDay={programDay} setProgramDay={setProgramDay} />
            <Button onClick={postProgram}>Create Program</Button>
        </>
    )
}

export default ProgramPage;