import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgramItem from '../ProgramItem/ProgramItem';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';




function ProgramList({ exerciseToAddToProgram, setExerciseToAddToProgram, editProgramItem, frequencyToDays, setFrequencyToDays }) {

    const dispatch = useDispatch();

    const program = useSelector(state => state.workout.programReducer);
    const time = useSelector(store => store.workout.weeksReducer)

    const programDay = time.programDay

    const [day, setDay] = useState([]);
    // const [frequencyToDays, setFrequencyToDays] = useState([]);
    const [edit, setEdit] = useState(false);




    const handleDayChange = (event) => {
        const day = Number(event.target.value)

        dispatch({ type: 'SET_PROGRAM_DAY', payload: day })

        setExerciseToAddToProgram({ ...exerciseToAddToProgram, program_day: day })
    };

    const handleEditProgram = () => {
        setEdit(true);
    }

    const handleSaveProgram = () => {
        dispatch({ type: 'SAVE_PROGRAM', payload: program })
        setEdit(false);
    }

    const handleDeleteProgram = () => {
        dispatch({ type: 'DELETE_PROGRAM' })
    }




    useEffect(() => {
        dispatch({ type: 'GET_PROGRAM' })
    }, [])


    useEffect(() => {

        let temporaryProgramDay = [];

        for (const exercise of program) {
            if (exercise.program_day == programDay) {
                temporaryProgramDay.push(exercise);
            }
            setDay(temporaryProgramDay);
        }

    }, [program])


    useEffect(() => {
        let temporaryProgramDay = [];

        for (const exercise of program) {
            if (exercise.program_day == programDay) {
                temporaryProgramDay.push(exercise);
            }
            setDay(temporaryProgramDay);
        }
    }, [programDay])




//Dane says these two conflicting with each other screams refactor. Have on source
//of truth for setFrequencyToDays

    // useEffect(() => {
    //         let programDays = [];

    //         for (let day of program) {
    //             if (programDays.includes(day.program_day) === false) {
    //                 programDays.push(day.program_day);
    //             }
    //         }
    //         setFrequencyToDays(programDays);

    //         dispatch({ type: 'HOLD_FREQUENCY', payload: programDays.length })
    // }, [program]);


    // //This useEffect turns the frequency number in the workout reducer into
    // //an array of numbers for the RadioGroup .map to loop over
    // useEffect(() => {
    //     let programDays = [];
    //     let count = 1
    //     const frequency = time.frequency;

    //     for (let i = 0; i < frequency; i++) {
    //         programDays.push(count);
    //         count++
    //     }
    //     setFrequencyToDays(programDays);
    // }, [time])

    return (
        <>
            <div className='time-inputs'>
                <FormControl component='fieldset'>
                    <FormLabel component='legend'>Program Day</FormLabel>
                    <RadioGroup row aria-label='Day' name='day' value={Number(programDay)} onChange={handleDayChange}>
                        {frequencyToDays && frequencyToDays.map((day, i) => {
                            return (
                                <FormControlLabel key={i} color='primary' labelPlacement='top' value={day} control={<Radio />} label={day} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            </div>
            <div id='program-icons'>
                {edit ?
                    <SaveIcon style={{ margin: 10 }} onClick={handleSaveProgram}></SaveIcon>
                    :
                    <EditIcon style={{ margin: 10 }} onClick={handleEditProgram}></EditIcon>}
            </div>
            <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                    <TableHead>
                        {editProgramItem ?
                            <TableRow>
                                <TableCell>Exercise</TableCell>
                                <TableCell align='right'>Sets</TableCell>
                                <TableCell align='right'>Reps&nbsp;</TableCell>
                                <TableCell align='right'>Weight&nbsp;</TableCell>
                                <TableCell align='center'></TableCell>
                                <TableCell align='center'></TableCell>
                            </TableRow>
                            :
                            <TableRow>
                                <TableCell>Exercise</TableCell>
                                <TableCell align='right'>Sets</TableCell>
                                <TableCell align='right'>Reps&nbsp;</TableCell>
                                <TableCell align='right'>Weight&nbsp;</TableCell>
                            </TableRow>}
                    </TableHead>
                    <TableBody>
                        {day.map((exercise) => (
                            <ProgramItem
                                key={exercise.exercise_id}
                                exercise={exercise}
                                edit={edit}
                                setEdit={setEdit}
                                editProgramItem={editProgramItem}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {edit ?
                <Button variant='contained' color='secondary' style={{ margin: 5 }} onClick={handleDeleteProgram}>Delete Program</Button>
                : null}
        </>
    )
}

export default ProgramList;