import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

function UserPage() {

  const history = useHistory();

  const user = useSelector((store) => store.user);

  const goToMaxes = () => {
    history.push('/max');
  }

  const goToProgram = () => {
    console.log('Going!');
  }

  return (
    <div className="container user-page">
      <h2>Welcome, {user.username}!</h2>
      <div>
        <h3>Maxes</h3>
        <div id="max-display">
          <p>Bench: 205</p>
          <p>Squat: 225</p>
          <p>Clean: 185</p>
        </div>
        <Button variant="outlined" color="primary" onClick={goToMaxes}>Max</Button>
      </div>
      <br />
      <Button variant="contained" color="primary" onClick={goToProgram}>Program</Button>

      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
