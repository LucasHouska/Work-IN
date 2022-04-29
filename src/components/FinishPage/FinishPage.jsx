import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';




function FinishPage() {

    const dispatch = useDispatch();
    const history = useHistory();


    const handleClose = () => {
        dispatch({ type: 'CLEAR_WORKOUT' })

        history.push('/workout')
    }




    return (
        <>
            <div id='finish'>
                <h1>YOU DID IT</h1>
                <Button variant='contained' color='primary' onClick={handleClose}>Close</Button>
            </div>
        </>
    )
}

export default FinishPage;