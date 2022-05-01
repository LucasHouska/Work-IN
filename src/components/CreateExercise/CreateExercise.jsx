import { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './CreateExercise.css';

function CreateExercise() {

    const dispatch = useDispatch();
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        formControl: {
            minWidth: 200,
        },
    }));

    //Template for new exercise being created
    const [exerciseToCreate, setExerciseToCreate] = useState({
        exercise_name: '',
        exercise_type: '',
        main_muscle_worked: '',
        exercise_equipment_needed: '',
        difficulty_level: '',
        exercise_instructions: '',
        exercise_benefits: '',
        exercise_image_1: '',
        exercise_image_2: ''
    });

    //Sends new exercise to exercise saga and moves user to workout page
    const handleSubmit = () => {
        dispatch({ type: 'CREATE_EXERCISE', payload: exerciseToCreate });

        history.push('/workout');
    }

    const classes = useStyles();

    return (
        <>
            <form className='create-exercise-form' onSubmit={handleSubmit}>
                <TextField id='exercise-name' className='textField' type='text' label='Exercise Name' variant='standard' onChange={event => setExerciseToCreate({ ...exerciseToCreate, exercise_name: event.target.value })} />
                <FormControl className={classes.formControl}>
                    <InputLabel id='exercise-type-select-label'>Exercise Type</InputLabel>
                    <Select
                        labelId='exercise-type-select-label'
                        id='exercise-type-select'
                        value={exerciseToCreate.exercise_type}
                        onChange={event => setExerciseToCreate({ ...exerciseToCreate, exercise_type: event.target.value })}
                    >
                        <MenuItem value='Cardio'>Cardio</MenuItem>
                        <MenuItem value={'Olympic Weightlifting'}>Olympic Weightlifting</MenuItem>
                        <MenuItem value={'Plyometrics'}>Plyometrics</MenuItem>
                        <MenuItem value='Powerlifting'>Powerlifting</MenuItem>
                        <MenuItem value={'Strength'}>Strength</MenuItem>
                        <MenuItem value={'Stretching'}>Stretching</MenuItem>
                        <MenuItem value={'Strongman'}>Strongman</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id='main-muscle-type-select-label'>Main Muscle Worked</InputLabel>
                    <Select
                        labelId='main-muscle-type-select-label'
                        id='main-muscle-type-select'
                        value={exerciseToCreate.main_muscle_worked}
                        onChange={event => setExerciseToCreate({ ...exerciseToCreate, main_muscle_worked: event.target.value })}
                    >
                        <MenuItem value='Abdominals'>Abdominals</MenuItem>
                        <MenuItem value={'Abductors'}>Abductors</MenuItem>
                        <MenuItem value={'Adductors'}>Adductors</MenuItem>
                        <MenuItem value='Biceps'>Biceps</MenuItem>
                        <MenuItem value={'Calves'}>Calves</MenuItem>
                        <MenuItem value={'Chest'}>Chest</MenuItem>
                        <MenuItem value='Forearms'>Forearms</MenuItem>
                        <MenuItem value={'Glutes'}>Glutes</MenuItem>
                        <MenuItem value={'Hamstrings'}>Hamstrings</MenuItem>
                        <MenuItem value='Lats'>Lats</MenuItem>
                        <MenuItem value={'Lower Back'}>Lower Back</MenuItem>
                        <MenuItem value={'Middle Back'}>Middle Back</MenuItem>
                        <MenuItem value='Neck'>Neck</MenuItem>
                        <MenuItem value={'Quadriceps'}>Quadriceps</MenuItem>
                        <MenuItem value={'Shoulders'}>Shoulders</MenuItem>
                        <MenuItem value='Traps'>Traps</MenuItem>
                        <MenuItem value={'Triceps'}>Triceps</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id='equipment-needed-select-label'>Equipment Needed</InputLabel>
                    <Select
                        labelId='equipment-needed-select-label'
                        id='equipment-needed-select'
                        value={exerciseToCreate.exercise_equipment_needed}
                        onChange={event => setExerciseToCreate({ ...exerciseToCreate, exercise_equipment_needed: event.target.value })}
                    >
                        <MenuItem value='Bands'>Bands</MenuItem>
                        <MenuItem value={'Barbell'}>Barbell</MenuItem>
                        <MenuItem value={'Body Only'}>Body Only</MenuItem>
                        <MenuItem value='Cable'>Cable</MenuItem>
                        <MenuItem value={'Dumbbell'}>Dumbbell</MenuItem>
                        <MenuItem value={'E-Z Curl Bar'}>E-Z Curl Bar</MenuItem>
                        <MenuItem value='Exercise Ball'>Exercise Ball</MenuItem>
                        <MenuItem value={'Foam Roll'}>Foam Roll</MenuItem>
                        <MenuItem value={'Kettlebells'}>Kettlebells</MenuItem>
                        <MenuItem value='Machine'>Machine</MenuItem>
                        <MenuItem value={'Medicine Ball'}>Medicine Ball</MenuItem>
                        <MenuItem value={'None'}>None</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id='difficulty-level-select-label'>Difficulty Level</InputLabel>
                    <Select
                        labelId='difficulty-level-select-label'
                        id='difficulty-level-select'
                        value={exerciseToCreate.difficulty_level}
                        onChange={event => setExerciseToCreate({ ...exerciseToCreate, difficulty_level: event.target.value })}
                    >
                        <MenuItem value='Beginner'>Beginner</MenuItem>
                        <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                        <MenuItem value={'Expert'}>Expert</MenuItem>
                    </Select>
                </FormControl>
                <TextField id='exercise-instructions' className='textField' type='text' label='Exercise Instructions' variant='standard' onChange={event => setExerciseToCreate({ ...exerciseToCreate, exercise_instructions: event.target.value })} />
                <TextField id='exercise-benefits' className='textField' type='text' label='Exercise Benefits' variant='standard' onChange={event => setExerciseToCreate({ ...exerciseToCreate, exercise_benefits: event.target.value })} />
                <br />
                <TextField id='exercise-picture-1' className='textField' type='text' label='First Exercise Picture' variant='standard' style={{ width: 200 }} onChange={event => setExerciseToCreate({ ...exerciseToCreate, exercise_image_1: event.target.value })} />
                <TextField id='exercise-picture-2' className='textField' type='text' label='Second Exercise Picture' variant='standard' style={{ width: 200 }} onChange={event => setExerciseToCreate({ ...exerciseToCreate, exercise_image_2: event.target.value })} />
                <br />
                <Button type='submit' variant='contained' color='primary'>Create Exercise</Button>
            </form>
        </>
    )
}

export default CreateExercise;