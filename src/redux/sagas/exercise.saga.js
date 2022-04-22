import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getExercises() {
    let exercises = yield axios.get('/api/workout');

    yield put({type: 'SET_EXERCISES', payload: exercises.data});
}

function* createExercise(action) {
    yield axios.post('/api/exercise/create-exercise', action.payload);
}

function* getMaxes() {
    let maxes = yield axios.get('/api/exercise');

    yield put({type: 'SET_MAXES', payload: maxes.data});
}

function* exerciseSaga() {
    yield takeEvery('GET_EXERCISES', getExercises);

    yield takeEvery('CREATE_EXERCISE', createExercise);

    yield takeEvery('GET_MAXES', getMaxes);
}

export default exerciseSaga;