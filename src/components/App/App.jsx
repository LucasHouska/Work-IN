import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';
import WorkoutPage from '../WorkoutPage/WorkoutPage';
import ExercisePage from '../ExercisePage/ExercisePage';
import FinishPage from '../FinishPage/FinishPage';
import CreateExercise from '../CreateExercise/CreateExercise';
import MaxPage from '../MaxPage/MaxPage';
import ProgramPage from '../ProgramPage/ProgramPage';
import ProgressPage from '../ProgressPage/ProgressPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <div id='switch'>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from='/' to='/home' />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path='/about'
              >
                <AboutPage />
              </Route>

              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path='/user'
              >
                <UserPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path='/create-exercise'
              >
                {user.access_level > 0 ?
                  <CreateExercise />
                  :
                  <Redirect to='/home' />}
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path='/workout'
              >
                <WorkoutPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path='/exercise/:workoutId/:exerciseNumber'
              >
                <ExercisePage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path='/finish'
              >
                <FinishPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path='/progress'
              >
                <ProgressPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path='/max'
              >
                <MaxPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path='/program'
              >
                <ProgramPage />
              </ProtectedRoute>

              <Route
                exact
                path='/login'
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /user page
                  <Redirect to='/workout' />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>

              <Route
                exact
                path='/registration'
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to='/workout' />
                  :
                  // Otherwise, show the registration page
                  <RegisterPage />
                }
              </Route>

              <Route
                exact
                path='/home'
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to='/workout' />
                  :
                  // Otherwise, show the Landing page
                  <LoginPage />
                }
              </Route>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
        </div>
        <Nav />
      </div>
    </Router>
  );
}

export default App;
