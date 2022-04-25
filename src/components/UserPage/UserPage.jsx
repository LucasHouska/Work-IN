import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

import Button from '@material-ui/core/Button';

function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const maxes = useSelector(state => state.exercises.maxReducer);
  const user = useSelector((store) => store.user);

  const [favorites, setFavorites] = useState([]);

  const goToMaxes = () => {
    history.push('/max');
  }

  const goToProgram = () => {
    history.push('/program');
  }


  useEffect(() => {
    dispatch({ type: 'GET_MAXES' });
  }, [])

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
      <h2>Welcome, {user.username}!</h2>
      <br />
      <div>
        {/* In the future,  */}
        <h3>Maxes</h3>
        <div id="max-display">
          {favorites.map(max => {
            return (
              <p key={max.id}>{max.name_of_exercise}: <span>{max.weight}</span></p>
            )
          })}
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
