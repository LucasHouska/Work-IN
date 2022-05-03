import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { useCallback } from 'react';


function* getProgram() {
    let program = yield axios.get('/api/program/program');

    yield put({ type: 'SET_PROGRAM', payload: program.data });

    yield put({ type: 'SET_PROGRAM_LENGTH', payload: program.data});
}

function* postProgram(action) {
    try {
        yield put({ type: 'DELETE_PROGRAM'});

        yield axios.post('/api/program/program', action.payload);

        yield ({ type: 'GET_PROGRAM'});

        yield action.callback;

    } catch (error) {
        console.log(error);
    }
}

function* editProgram(action) {
    try {
        yield put({ type: 'DELETE_PROGRAM' });

        yield put({ type: 'POST_PROGRAM', payload: action.payload });

        yield put({ type: 'GET_PROGRAM'})

    } catch (error) {
        console.log(error);
    }
}

function* deleteProgram() {
    try {
        yield axios.delete('/api/program');

        yield put({ type: 'GET_PROGRAM'})
    } catch (error) {
        console.log(error);
    }
}

function* programSaga() {
    yield takeEvery('GET_PROGRAM', getProgram);

    yield takeEvery('POST_PROGRAM', postProgram);

    yield takeEvery('SAVE_PROGRAM', editProgram);

    yield takeEvery('DELETE_PROGRAM', deleteProgram);
}

export default programSaga;