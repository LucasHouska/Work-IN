import { combineReducers } from "redux";


const exerciseNumber = (state = 2, action) => {
    if (action.type === 'ADD_TO_EXERCISE_NUMBER') {
        state = state + 1;
    }
    return state;
}

const workoutReducer = (state = [], action) => {
    if (action.type === 'ADD_EXERCISE_TO_WORKOUT') {
        console.log(...state, action.payload);
        return [...state, action.payload]
    } else if(action.type === 'EXERCISES_FOR_PROGRAM_DAY') {
        console.log('exercises from a program day:', action.payload)
        return action.payload;
    } else if (action.type === 'DELETE_EXERCISE_FROM_WORKOUT') {
        return state.filter(exercise => exercise.exerciseNumberInWorkout != action.payload).sort();
    } else if (action.type === 'EDIT_WORKOUT') {
        let exerciseToIndex = 0;
        let index = state.indexOf(exerciseToIndex);
        let temporaryState = [...state];

        for (const exercise of state) {
            if (exercise.exerciseNumberInWorkout == action.payload.exerciseNumberInWorkout) {
                exerciseToIndex = exercise;
            }
        }

        temporaryState.splice(index, 1, {
            exerciseNumberInWorkout: action.payload.exerciseNumberInWorkout,
            exercise_id: action.payload.exercise_id,
            exercise_name: action.payload.exercise_name,
            number_of_sets: action.payload.sets,
            number_of_reps: action.payload.reps,
            weight: action.payload.weight
        });

        return temporaryState;

    } else if(action.type === 'CLEAR_WORKOUT') {
        return [];
    }
    return state;
}

const workoutId = (state = 0, action) => {
    if (action.type === 'SET_WORKOUT_ID') {
        return action.payload;
    } else if(action.type === 'RESET_WORKOUT_ID') {
        return 0;
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



const programReducer = (state = [], action) => {
    if (action.type === 'ADD_EXERCISE_TO_PROGRAM') {
        console.log(...state, action.payload);
        return [...state, action.payload]
    } else if(action.type === 'SET_PROGRAM') {
        return action.payload;
    } else if (action.type === 'DELETE_EXERCISE_FROM_PROGRAM') {
        return state.filter(exercise => exercise.exerciseNumberInWorkout != action.payload).sort();
    } else if (action.type === 'EDIT_PROGRAM') {
        let exerciseToIndex = 0;
        let index = state.indexOf(exerciseToIndex);
        let temporaryState = [...state];

        for (const exercise of state) {
            if (exercise.exerciseNumberInWorkout == action.payload.exerciseNumberInWorkout) {
                exerciseToIndex = exercise;
            }
        }

        temporaryState.splice(index, 1, {
            exerciseNumberInWorkout: action.payload.exerciseNumberInWorkout,
            exercise_id: action.payload.exercise_id,
            exercise_name: action.payload.exercise_name,
            number_of_sets: action.payload.sets,
            number_of_reps: action.payload.reps,
            weight: action.payload.weight
        });

        return temporaryState;

    } else if(action.type === 'CLEAR_WORKOUT') {
        return [];
    }
    return state;
}

const weeksReducer = (state = {weeks: 0, startDate: '', frequency: 0}, action) => {
    if(action.type === 'HOLD_WEEKS') {
        return {...state, weeks: action.payload};
    } else if(action.type === 'HOLD_START_DATE') {
        return {...state, startDate: action.payload};
    } else if(action.type === 'HOLD_FREQUENCY') {
        return {...state, frequency: action.payload};
    }
    return state;
}

export default combineReducers({
    workoutReducer,
    workoutId,
    exerciseList,
    exerciseNumber,
    programReducer,
    weeksReducer
});