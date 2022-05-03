import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MaxItem from '../MaxItem/MaxItem';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

function MaxPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const maxes = useSelector(state => state.exercises.maxReducer)
    const [editNewMax, setEditNewMax] = useState(false);
    const [newMax, setNewMax] = useState({ name_of_exercise: '', weight: 0 });

    const createNewMax = () => {
        setEditNewMax(true);
    }

    const addNewMax = () => {
        dispatch({ type: 'POST_MAX', payload: newMax })

        setEditNewMax(false)
    }

    const handleDelete = () => {

    }

    const goToProfile = () => {
        history.push('/user')
    }

    useEffect(() => {
        dispatch({ type: 'GET_MAXES' })
    }, [])

    return (
        <>
            <div id='delete-icon'>
                <DeleteIcon onClick={handleDelete}></DeleteIcon>
            </div>
            <h1 id='maxes-title'>Maxes</h1>
            <div className='max-input'>
                {editNewMax ?
                    <div className='max-input'>
                        <TextField type='text' label='Exercise Name' variant='standard' onChange={(event) => { setNewMax({ ...newMax, name_of_exercise: event.target.value }) }} />
                        <TextField type='number' label='Weight' variant='standard' onChange={(event) => { setNewMax({ ...newMax, weight: Number(event.target.value) }) }} />
                        <Button className='max-input' variant='outlined' color='primary' onClick={addNewMax}>Add New Max</Button>
                    </div>
                    :
                    <Button variant='outlined' color='primary' onClick={createNewMax}>New Max</Button>}
            </div>
            <div className='max-list'>
                {maxes.map(max => {
                    return (<MaxItem key={max.id} max={max} />)
                })}
            </div>
            <div className='button'>
                <Button variant='contained' color='primary' style={{ margin: 20 }} onClick={goToProfile}>Back to Profile</Button>
            </div>
        </>
    )
}

export default MaxPage;