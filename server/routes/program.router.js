const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
 router.get('/program', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT * FROM "program" 
    JOIN "exercises" ON "program".exercise_id = "exercises".id`

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error in program GET on workout router', error);
        res.sendStatus(500);
    })
})

/**
 * POST route template
 */
 router.post('/program', rejectUnauthenticated, (req, res) => {
    const queryText = `
    INSERT INTO "program" ("program_day", "exercise_number_in_workout", "exercise_id", "set_number", "repetitions", "weight")
    VALUES ($1, $2, $3, $4, $5, $6);`;

    const program = req.body;

    console.log(program)

    for (const day of program) {
        const values = [day.program_day, day.exerciseNumberInWorkout, day.exercise_id, day.number_of_sets, day.number_of_reps, day.weight];

        pool.query(queryText, values).then(result => {

        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
    }
})

module.exports = router;
