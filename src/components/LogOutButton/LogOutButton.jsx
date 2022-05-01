import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      variant='contained'
      color='primary'
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
