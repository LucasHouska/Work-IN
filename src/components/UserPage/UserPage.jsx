import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import ProgramList from '../ProgramList/ProgramList';

import Button from '@material-ui/core/Button';

function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const maxes = useSelector(state => state.exercises.maxReducer);
  const program = useSelector(state => state.workout.programReducer)
  const user = useSelector((store) => store.user);

  const [favorites, setFavorites] = useState([]);
  const [programExists, setProgramExists] = useState(false);
  const [editProgramItem, setEditProgramItem] = useState(false);



  const goToMaxes = () => {
    history.push('/max');
  }

  const goToProgram = () => {
    history.push('/program');
  }

  const goToAbout = () => {
    history.push('/about');
  }


  useEffect(() => {
    dispatch({ type: 'GET_MAXES' });
    dispatch({ type: 'GET_PROGRAM' })
  }, [])

  useEffect(() => {
    console.log('i', program)
    if (program[0] && program[0].program_number == 1) {
        setProgramExists(true);
    }
  }, [program])

  useEffect(() => {

    let temporaryFavorites = [];

    for (const max of maxes) {
      if (max.favorite === true) {
        temporaryFavorites.push(max);
      }
    }
    setFavorites(temporaryFavorites);
  }, [maxes])

  return (
    <div className="container user-page">
      <h1>Welcome, {user.username}!</h1>
      <br />
      <div>
        <h2>Your Maxes</h2>
        <div id="max-display">
          {favorites.map((max, i) => {
            return (
              <div className="max-item" key={i}>
                <h3>{max.name_of_exercise}</h3>
                <p>{max.weight}</p>
              </div>
            )
          })}
        </div>
        <Button variant="outlined" color="primary" onClick={goToMaxes}>Max</Button>
      </div>
      <div id="program-display">
        {programExists ?
          <div>
            <h2>Your Program</h2>
            <ProgramList editProgramItem={editProgramItem}/>
            <Button variant="contained" color="primary" style={{ margin: 20 }} onClick={goToProgram}>Manage Program</Button>
          </div>
          :
          <Button variant="contained" color="primary" style={{ margin: 20 }} onClick={goToProgram}>Create a Program</Button>}
      </div>
      <Button variant="contained" color="primary" style={{ margin: 20 }} onClick={goToAbout}>About</Button>
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
