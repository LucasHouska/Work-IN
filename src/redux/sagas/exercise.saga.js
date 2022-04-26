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

function* updateMaxWeight(action) {
    yield axios.put('/api/exercise/max_weight', action.payload);

    yield put({type: 'GET_MAXES'})
}

function* updateFavorite(action) {
    yield axios.put('/api/exercise', action.payload);

    yield put({type: 'GET_MAXES'})
}

function* getProgress(action) {
    let progress = yield axios.get(`/api/exercise/progress/${action.payload}`)

    yield put({ type: 'SET_PROGRESS', payload: progress.data });
}

function* exerciseSaga() {
    yield takeEvery('GET_EXERCISES', getExercises);

    yield takeEvery('CREATE_EXERCISE', createExercise);

    yield takeEvery('GET_MAXES', getMaxes);

    yield takeEvery('UPDATE_MAX_WEIGHT', updateMaxWeight);

    yield takeEvery('UPDATE_FAVORITE', updateFavorite);

    yield takeEvery('GET_PROGRESS', getProgress);
}

export default exerciseSaga;