import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getExercises() {
    let exercises = yield axios.get('/api/workout')

    yield put({type: 'SET_EXERCISES', payload: exercises.data})
}

function* exerciseSaga() {
    yield takeEvery('GET_EXERCISES', getExercises)
}

export default exerciseSaga;