const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const queryText = `SELECT "id", "exercise_name" FROM "exercises"`

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error in workout get', error);
    })
});

router.get('/:workoutId', rejectUnauthenticated, (req, res) => {

    console.log('workout id in get', req.params.workoutId);

    const workoutId = req.params.workoutId;

    console.log('workoutId in specified GET', workoutId)


    const queryText = `
    SELECT "workouts-exercises".id, "workout_id", "exercise_number_in_workout", "exercise_id", "set_number", "repetitions", "weight", "notes", "exercise_name", "exercise_type", "main_muscle_worked", "exercise_equipment_needed", "difficulty_level", "exercise_instructions", "exercise_benefits", "exercise_image_1", "exercise_image_2" 
    FROM "workouts-exercises"
    JOIN "exercises" ON "workouts-exercises".exercise_id = "exercises".id
    WHERE "workout_id" = $1
    ORDER BY "exercise_number_in_workout", "set_number";`;

    const value = [workoutId];

    pool.query(queryText, value).then(result => {
        console.log('Exercise one GET', result.rows)
        res.send(result.rows)
    }).catch(error => {
        console.log('Error in workout specific GET', error)
        res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
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

                pool.query(queryText, values).then(result => {
                    console.log('result', result);
                }).catch(error => {
                    console.log(error);
                    // res.sendStatus(500)
                })
                console.log(count);
            }
        }

        res.send({ workoutId })

    }).catch(error => {
        console.log('Error in workoutPOST', error)
        res.sendStatus(500);
    })
});

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('put:', req.body)

    const queryText = `
    UPDATE "workouts-exercises"
    SET "repetitions" = $1,
    "weight" = $2
    WHERE "id" = $3
    RETURNING "workout_id"
    `

    const values = [Number(req.body.reps), Number(req.body.weight), req.body.id]

    pool.query(queryText, values).then(result => {
        const workoutId = result.rows[0].workout_id;

        res.send({ workoutId });
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

router.delete('/:exercise_id', rejectUnauthenticated, (req, res) => {
    console.log('exercise:', req.params.exercise_id);

    const queryText = `
    DELETE FROM "workouts-exercises"
    WHERE "id" = $1
    RETURNING "workout_id";
    `;

    const value = [req.params.exercise_id];

    pool.query(queryText, value).then(result => {
        res.send(result.rows[0]);
    }).catch(error => {
        res.sendStatus(500);
    })
})

module.exports = router;