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
  }).catch(error=> {
      console.log('Error in workout get', error);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;