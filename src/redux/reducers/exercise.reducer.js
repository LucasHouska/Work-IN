import { combineReducers } from "redux";


const exerciseReducer = (state = [], action) => {
    //Gets exercises from "exercises" table and brings them to Autocomplete input
    if(action.type === 'SET_EXERCISES') {
        return action.payload;
    }
    return state;
}

const maxReducer = (state = [], action) => {
    if( action.type === 'SET_MAXES') {
        return action.payload;
    }
    return state;
}

const progressExercises = (state = [], action) => {
    if (action.type === 'SET_PROGRESS_EXERCISES') {
        return action.payload;
    }
    return state;
}

const progressReducer = (state = [], action) => {
    if(action.type === 'SET_PROGRESS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    exerciseReducer,
    maxReducer,
    progressReducer,
    progressExercises
});