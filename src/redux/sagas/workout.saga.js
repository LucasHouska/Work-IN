import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postWorkout(action) {
    let workout = yield axios.post('/api/workout', action.payload)

    console.log('workoutId in postWorkout', workout.data.workoutId)

    yield put({type: 'SET_WORKOUT_ID', payload: workout.data.workoutId})
}

function* getWorkout(action) {
    console.log('getWorkout payload', action.payload)

    let exerciseList = yield axios.get(`/api/workout/${action.payload}`)

    console.log('exerciseList in getWorkout is', exerciseList.data);

    yield put({type: 'SET_WORKOUT', payload: exerciseList.data})
}

function* deleteSet(action) {
    let response = yield axios.delete(`/api/workout/${action.payload}`)

    console.log('workout id?', response.data)

    yield put({type: 'GET_WORKOUT', payload: response.data.workout_id});
}

function* workoutSaga() {
    yield takeEvery('POST_WORKOUT', postWorkout);
    
    yield takeEvery('GET_WORKOUT', getWorkout);

    yield takeEvery('DELETE_SET', deleteSet);
}

export default workoutSaga;