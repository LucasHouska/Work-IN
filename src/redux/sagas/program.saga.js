import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* getProgram() {
    let program = yield axios.get('/api/program/program');

    console.log('program:', program.data);

    yield put({ type: 'SET_PROGRAM', payload: program.data});
}

function* postProgram(action) {
    try {
        console.log(action.payload)
    yield axios.post('/api/program/program', action.payload);

    } catch(error) {
        console.log(error);
    }
}

function* deleteProgram() {
    try {
    yield axios.delete('/api/program');

    } catch(error) {
        console.log(error);
    }
}

function* programSaga() {
    yield takeEvery('GET_PROGRAM', getProgram);

    yield takeEvery('POST_PROGRAM', postProgram);

    yield takeEvery('DELETE_PROGRAM', deleteProgram);
}

export default programSaga;