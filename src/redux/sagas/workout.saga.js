import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postWorkout(action) {
    let workout = yield axios.post('/api/workout', action.payload)

    console.log('workoutId in postWorkout', action.payload.workoutId)

    yield put({type: 'SET_WORKOUT_ID', payload: workout.data.workoutId})
}

function* getWorkout(action) {
    console.log('getWorkout payload', action.payload)

    let exercises = yield axios.get(`/api/workout/${action.payload.workoutId}/${action.payload.exerciseNumber}`)

    console.log('exerciseList in getWorkout is', exercises.data);

    yield put({type: 'SET_WORKOUT', payload: exercises.data})
}

function* workoutSaga() {
    yield takeEvery('POST_WORKOUT', postWorkout);
    
    yield takeEvery('GET_WORKOUT', getWorkout);
}

export default workoutSaga;