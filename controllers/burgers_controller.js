const express = require('express');
const router = express.Router();
// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');



// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burger: data,
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burger', (req, res) => {
  console.log(req.body.burger_name)
  burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, false], (result) => {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    console.log(result);
    res.redirect('/')
  });
});

router.put('/api/burger/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log('condition', condition);

  burger.updateOne(
    {
      devoured: req.body.devoured
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete('/api/burger/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  console.log(condition);
  burger.deleteBurger(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
