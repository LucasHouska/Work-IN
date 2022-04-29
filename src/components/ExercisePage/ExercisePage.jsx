import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ExerciseItem from '../ExerciseItem/ExerciseItem';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './ExercisePage.css'




function ExercisePage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const workoutId = Number(useParams().workoutId);
    const index = Number(useParams().exerciseNumber);
    const exerciseList = useSelector(state => state.workout.exerciseList);
    // const workoutId = useSelector(state => state.workout.workoutId)

    const [currentExercise, setCurrentExercise] = useState([]);

    const [lastExercise, setLastExercise] = useState(false);


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        imageList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
            justifyContent: 'center'
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));



    const itemData = [
        {
            id: 1,
            img: currentExercise[0]?.exercise_image_1,
            instructions: currentExercise[0]?.instructions
        },
        {
            id: 2,
            img: currentExercise[0]?.exercise_image_2
        }]


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNextExercise = () => {
        history.push(`/exercise/${workoutId}/${index + 1}/`)
    }

    const handleFinish = () => {
        history.push('/finish');
    }


    //In case the user deletes an exercise in the WorkoutList, this function 
    //ensures that the exercises will still render in order written
    const exerciseOrder = () => {
        let exerciseNumbersInOrder = [];
        let temporaryCurrentExercise = [];
        let count = 1;

        for (const exercise of exerciseList) {
            if (exerciseNumbersInOrder.includes(exercise.exercise_number_in_workout) === false) {
                exerciseNumbersInOrder.push(exercise.exercise_number_in_workout)
                count = count++;
            }
            else {
                count = count++;
            }
        }

        for (const exercise of exerciseList) {
            if (exercise.exercise_number_in_workout === exerciseNumbersInOrder[index]) {
                console.log(exercise)

                temporaryCurrentExercise.push(exercise);

            }

        }

        setCurrentExercise(temporaryCurrentExercise);

        if (index === (exerciseNumbersInOrder.length - 1)) {
            setLastExercise(true);
        }

        console.log('exerciseNumbersInOrder', exerciseNumbersInOrder);

    }


    useEffect(() => {

        exerciseOrder();

    }, [exerciseList])


    useEffect(() => {
        dispatch({ type: `GET_WORKOUT`, payload: workoutId });

    }, [])

    const classes = useStyles();




    return (
        <>
            <h1 className='exercise-name'>{currentExercise[0]?.exercise_name.toUpperCase()}</h1>

            <div className={classes.root}>
                <ImageList rowHeight='auto' className={classes.imageList} cols={2.5} gap={10}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.id}>
                            <img src={item.img} alt={item.instructions} />
                            <ImageListItemBar
                                classes={{
                                    root: classes.titleBar,
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>

            <div className='details'>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Details
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Instructions:</h2>
                            <p id="transition-modal-description">{currentExercise[0]?.exercise_instructions}</p>
                        </div>
                    </Fade>
                </Modal>
            </div>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sets</TableCell>
                            <TableCell align="center">Reps&nbsp;</TableCell>
                            <TableCell align="center">Weight&nbsp;</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentExercise && currentExercise.map((exercise) => (
                            <ExerciseItem
                                key={exercise?.id}
                                exercise={exercise}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='button'>
                {lastExercise ? <Button className='button' variant='contained' color='primary' onClick={handleFinish}>Finish</Button> : <Button className='button' variant='contained' color='primary' onClick={handleNextExercise}>Next Exercise</Button>}
            </div>
        </>
    )
}

export default ExercisePage;