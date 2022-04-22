const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "id", "name_of_exercise", "weight" FROM "maxes"
    WHERE "user_id" = $1;`;

    const value = [req.user.id];


    pool.query(queryText, value).then(result => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500);
        console.log(error);
    })

});

 router.post('/create-exercise', rejectUnauthenticated, (req, res) => {
    const queryText = `
    INSERT INTO "exercises" ("exercise_name", "exercise_type", "main_muscle_worked", "exercise_equipment_needed", "difficulty_level",
    "exercise_instructions", "exercise_benefits", "exercise_image_1", "exercise_image_2")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    const values = [req.body.exercise_name, req.body.exercise_type, req.body.main_muscle_worked, req.body.exercise_equipment_needed,
    req.body.difficulty_level, req.body.exercise_instructions, req.body.exercise_benefits, req.body.exercise_image_1, req.body.exercise_image_2];

    if (req.user.access_level > 0) {
        pool.query(queryText, values).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
            console.log(error);
        })
    }
})

module.exports = router;