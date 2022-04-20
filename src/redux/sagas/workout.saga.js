import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postWorkout(action) {
    let workout = yield axios.post('/api/workout', action.payload)

    // yield put({type: 'SET_WORKOUT_ID', payload: workout.data.workoutId})

    yield put({type: 'GET_WORKOUT', payload: workout.data.workoutId})

    //If I use this post again, add an if statement in front if(callback)
    yield action.callback(workout.data.workoutId)
}

function* getWorkout(action) {
    let exerciseList = yield axios.get(`/api/workout/${action.payload}`)

    yield put({type: 'SET_WORKOUT', payload: exerciseList.data})
}

function* updateSet(action) {
    let response = yield axios.put(`/api/workout`, action.payload);

    yield put({type: 'GET_WORKOUT', payload: response.data.workoutId})
}

function* deleteSet(action) {
    let response = yield axios.delete(`/api/workout/${action.payload}`)

    yield put({type: 'GET_WORKOUT', payload: response.data.workout_id});
}

function* workoutSaga() {
    yield takeEvery('POST_WORKOUT', postWorkout);
    
    yield takeEvery('GET_WORKOUT', getWorkout);

    yield takeEvery('UPDATE_SET', updateSet);

    yield takeEvery('DELETE_SET', deleteSet);
}

export default workoutSaga;