import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';




function FinishPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    //Clears workout and returns user to workout page
    const handleClose = () => {
        dispatch({ type: 'CLEAR_WORKOUT' })

        history.push('/workout')
    }




    return (
        <>
            <div id='finish'>
                <h1>That's it!</h1>
                <h2>All done!</h2>
                <br/>
                <Button variant='contained' color='primary' onClick={handleClose}>End Workout</Button>
            </div>
        </>
    )
}

export default FinishPage;