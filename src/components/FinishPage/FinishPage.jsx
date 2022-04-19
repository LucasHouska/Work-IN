import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

function FinishPage() {

    const history = useHistory();

    const handleClose = () => {
        history.push('/workout')
    }
    return (
        <>
            <h1>YOU DID IT</h1>
            <Button variant='contained' color='primary' onClick={handleClose}>Close</Button>
        </>
    )
}

export default FinishPage;