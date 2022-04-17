const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    const queryText = `SELECT "id", "exercise_name" FROM "exercises"`

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error in workout get', error);
    })
});

router.get('/:workoutId/:exerciseNumber', (req, res) => {
    
    console.log('workout id in get', req.params.workoutId);
    console.log('workout id in get', req.params.exerciseNumber);

    const workoutId = req.params.workoutId;
    const exerciseNumber = req.params.exerciseNumber;


    const queryText = `
    SELECT * FROM "workouts-exercises"
    WHERE "workout_id" = $1 AND
    "exercise_number_in_workout" = $2;`;

    const values = [workoutId, exerciseNumber];

    pool.query(queryText, values).then(result => {
        console.log('Exercise one GET', result.rows)
        res.send(result.rows)
    }).catch(error => {
        console.log('Error in workout specific get', error)
        res.sendStatus(500)
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here

    console.log('body', req.body)

    const queryText = `
    INSERT INTO "workouts" ("user_id")
    VALUES ($1)
    RETURNING "id";
    `;

    const value = [req.user.id]

    pool.query(queryText, value).then(result => {
        const workoutId = result.rows[0].id;

        console.log('Workout id', workoutId);

        const queryText = `
        INSERT INTO "workouts-exercises" ("workout_id", "exercise_number_in_workout", "exercise_id", "set_number", "repetitions", "weight")
        VALUES ($1, $2, $3, $4, $5, $6);
        `;

        for (let i = 0; i < req.body.length; i++) {

            const numberOfSets = Number(req.body[i].number_of_sets);
            const exerciseNumberInWorkout = Number(req.body[i].exerciseNumberInWorkout)
            const exerciseId = Number(req.body[i].exercise_id);
            const numberOfReps = Number(req.body[i].number_of_reps);
            const weight = Number(req.body[i].weight)

            let count = 0;

            for (let i = 0; i < numberOfSets; i++) {
                count++;

                let values = [workoutId, exerciseNumberInWorkout, exerciseId, count, numberOfReps, weight];

                pool.query(queryText, values)
                // .then(result => {

                // }).catch(error => {
                //     res.sendStatus(500)
                //     console.log(error);
                // })
                console.log(count);
            }
        }

        res.send({workoutId})
        
    }).catch(error => {
        res.sendStatus(500);
        console.log(error)
    })
});

module.exports = router;