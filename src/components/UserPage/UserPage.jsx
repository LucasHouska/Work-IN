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
      <br />
      <Button variant="contained" color="primary" onClick={goToProgram}>Program</Button>

      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
