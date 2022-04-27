import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import TrendingUp from '@material-ui/icons/TrendingUp';

function Nav() {

  const user = useSelector((store) => store.user);

  const history = useHistory();

  const useStyles = makeStyles({
    // root: {
    //   width: 500,
    // },
    stickToBottom: {
      width: "100%",
      position: "fixed",
      bottom: 0,
    }
  });

  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue)
    history.push(`/${newValue}`)
  };

  return (
    <div className="nav">
      {user.id && (
        <>
          <BottomNavigation className={classes.stickToBottom} value={value} onChange={handleChange} >
              <BottomNavigationAction label="Home" value="home" icon={<Home />} />
              <BottomNavigationAction label="FitnessCenter" value="workout" icon={<FitnessCenter />} />
              <BottomNavigationAction label="Progress" value="progress" icon={<TrendingUp />} />
          </BottomNavigation>
        </>
      )}
    </div>
  );
}

export default Nav;
