import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postWorkout(action) {
    console.log('curious...',action.payload)

    yield axios.post('/api/workout', action.payload)

    // console.log('postWorkout', response.data)

    // yield put({type: 'SET_WORKOUT', payload: exercise.data})
}

function* workoutSaga() {
    yield takeEvery('POST_WORKOUT', postWorkout)
}

export default workoutSaga;