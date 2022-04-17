const exerciseReducer = (state = [], action) => {
    //Gets exercises from "exercises" table and brings them to Autocomplete input
    if(action.type === 'SET_EXERCISES') {
        return action.payload;
    }
    return state;
}

export default exerciseReducer;