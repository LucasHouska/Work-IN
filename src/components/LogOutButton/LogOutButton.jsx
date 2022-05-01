import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function LogOutButton(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  const moveToWorkout = () => {
    history.push('/workout');
  }

  return (
    <Button
      variant='contained'
      color='primary'
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT', callback: moveToWorkout })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
