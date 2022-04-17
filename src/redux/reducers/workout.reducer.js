

const workoutReducer = (state = [], action) => {
    if (action.type === 'ADD_EXERCISE_TO_WORKOUT') {
        console.log(...state, action.payload);
        return [...state, action.payload]
    }
    return state;
}

export default workoutReducer;