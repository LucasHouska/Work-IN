import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, TextField } from '@material-ui/core';



function ProgressPage() {

    const dispatch = useDispatch();

    // const exerciseReducer = useSelector(state => state.exercises.exerciseReducer);
    const exercises = useSelector(state => state.exercises.exerciseReducer);
    const progress = useSelector(state => state.exercises.progressReducer);

    const data = progress;

    const handleExerciseInput = (event, value) => {
        dispatch({ type: 'GET_PROGRESS', payload: value.id })
    }


    useEffect(() => {
        dispatch({ type: 'GET_EXERCISES' })
    }, []);

    return (
        <>
            <div id='progress-page'>
                <h1>Your Progression</h1>
                <br />
                <Autocomplete
                    id='exercise-options'
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
                    onChange={handleExerciseInput}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label='Exercises' />}
                />
                <br />
                <LineChart width={350} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type='monotone' dataKey='weight' stroke='#8884d8' />
                    <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                    <XAxis dataKey='date' />
                    <YAxis dataKey='weight' />
                    <Tooltip />
                </LineChart>
            </div>
        </>
    )
}

export default ProgressPage;