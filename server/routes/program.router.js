const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
 router.get('/program', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "program".id, "program".program_day, "program"."exerciseNumberInWorkout", "program".exercise_id, "program".number_of_sets, 
    "program".number_of_reps, "program".weight, "exercises".exercise_name
    FROM "program" 
    JOIN "exercises" ON "program".exercise_id = "exercises".id
    ORDER BY "program".program_day;`

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
    INSERT INTO "program" ("program_day", "exerciseNumberInWorkout", "exercise_id", "number_of_sets", "number_of_reps", "weight", "program_number")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;

    const program = req.body;
    const program_number = req.body[0].program_number

    for (const day of program) {
        const values = [day.program_day, day.exerciseNumberInWorkout, day.exercise_id, day.number_of_sets, day.number_of_reps, day.weight, program_number];
        console.log(program_number)
        pool.query(queryText, values).then(result => {

        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
    }
})

module.exports = router;
