import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* getProgram() {
    let program = yield axios.get('/api/program/program');

    console.log('program:', program.data);

    yield put({ type: 'SET_PROGRAM', payload: program.data});
}

function* postProgram(action) {
    yield axios.post('/api/program/program', action.payload)

    yield action.callback();
}

function* programSaga() {
    yield takeEvery('GET_PROGRAM', getProgram);

    yield takeEvery('POST_PROGRAM', postProgram);
}

export default programSaga;