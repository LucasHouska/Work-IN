const exerciseReducer = (state = [], action) => {
    if(action.type === 'SET_EXERCISES') {
        return action.payload;
    }
    return state;
}

export default exerciseReducer;