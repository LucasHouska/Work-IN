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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
