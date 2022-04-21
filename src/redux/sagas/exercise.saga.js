import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getExercises() {
    let exercises = yield axios.get('/api/workout')

    yield put({type: 'SET_EXERCISES', payload: exercises.data})
}

function* createExercise(action) {
    yield axios.post('/api/workout/create-exercise', action.payload)
}

function* exerciseSaga() {
    yield takeEvery('GET_EXERCISES', getExercises)

    yield takeEvery('CREATE_EXERCISE', createExercise)
}

export default exerciseSaga;