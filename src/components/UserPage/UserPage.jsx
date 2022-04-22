import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

import Button from '@material-ui/core/Button';

function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const maxes = useSelector(state => state.exercises.maxReducer)
  const user = useSelector((store) => store.user);

  const [exerciseOne, setExerciseOne] = useState({});
  const [exerciseTwo, setExerciseTwo] = useState({});
  const [exerciseThree, setExerciseThree] = useState({});

  const goToMaxes = () => {
    history.push('/max');
  }

  const goToProgram = () => {
    console.log('Going!');
  }


  useEffect(() => {
    dispatch({ type: 'GET_MAXES' })
  }, [])

  useEffect(() => {

    //Considering changing this to "Top 3", which would be set on Max and display them in max display
    for (const max of maxes) {
      if (max.name_of_exercise === 'Bench') {
        setExerciseOne(max);
      } else if (max.name_of_exercise === 'Squat') {
        setExerciseTwo(max);
      } else if (max.name_of_exercise === 'Clean') {
        setExerciseThree(max);
      }
    }
  }, [maxes])

  return (
    <div className="container user-page">
      <h2>Welcome, {user.username}!</h2>
      <br />
      <div>
        {/* In the future,  */}
        <h3>Maxes</h3>
        <div id="max-display">
          <p>{exerciseOne.name_of_exercise}: <span>{exerciseOne.weight}</span></p>
          <p>{exerciseTwo.name_of_exercise}: <span>{exerciseTwo.weight}</span></p>
          <p>{exerciseThree.name_of_exercise}: <span>{exerciseThree.weight}</span></p>
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
