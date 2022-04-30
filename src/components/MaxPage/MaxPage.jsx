import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import MaxItem from '../MaxItem/MaxItem';

import Button from '@material-ui/core/Button'

function MaxPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const maxes = useSelector(state => state.exercises.maxReducer)

    const goToProfile = () => {
        history.push('/user')
    }

    useEffect(() => {
        dispatch({ type: 'GET_MAXES' })
    }, [])

    return (
        <>
            <h1 id='maxes-title'>Maxes</h1>
            <div className='max-list'>
                {maxes.map(max => {
                    return (<MaxItem key={max.id} max={max} />)
                })}
            </div>
            <div className='button'>
            <Button variant="contained" color="primary" style={{margin: 20}} onClick={goToProfile}>Back to Profile</Button>
            </div>
        </>
    )
}

export default MaxPage;