/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const { addMenuItem } = require('../db/queries/menuItems')
const { getUserById } = require('../db/queries/users')

router.get('/', (req, res) => {
  res.render('users');
});

// Route to handle form submission and add menu item to the database
router.post('/addMenuItem', addMenuItem);


// Route to fetch user by ID and determine if owner
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  // Fetch user by ID from the database
  db.query('SELECT * FROM users WHERE id = $1', [userId])
  .then(queryResult => {
    const user = queryResult.rows[0];
    if (!user) {
      res.status(404).send("No user exists");
    } else {
      // Check if user is an owner
      const isOwner = user.is_owner;
      if (isOwner) {
        res.send('Welcome Mr. Owner! Feel free to edit the menu even though it is already perfect!');
      } else {
        res.send('Welcome, customer! enjoy our critically acclaimed beautiful hotdogs and beautiful tacos!');
      }
    }
  })
  .catch(err => {
    console.error("error fetching user:", err);
    res.status(500).send("Internal Server Error");
  });
});


module.exports = router;
