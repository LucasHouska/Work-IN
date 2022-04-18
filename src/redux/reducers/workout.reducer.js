import { combineReducers } from "redux";


const exerciseNumber = (state = 2, action) => {
    if(action.type === 'ADD_TO_EXERCISE_NUMBER') {
        state = state + 1;
    }
    return state;
}

const workoutReducer = (state = [], action) => {
    if (action.type === 'ADD_EXERCISE_TO_WORKOUT') {
        console.log(...state, action.payload);
        return [...state, action.payload]
    }
    return state;
}

const workoutId = (state = 0, action) => {
    if (action.type === 'SET_WORKOUT_ID') {
        return action.payload;
    }
    return state;
}

const exerciseList = (state = [], action) => {
    if (action.type === 'SET_WORKOUT') {
        console.log('exerciseList reducer', action.payload)
        return action.payload;
    }
    return state;
}

export default combineReducers({
    workoutReducer,
    workoutId,
    exerciseList,
    exerciseNumber
  });;