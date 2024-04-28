/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const { addMenuItem, editMenuItem } = require('../db/queries/menuItems')
const { fetchAllMenuItems } = require('../db/queries/menuItems');

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/menuItems', async (req, res) => {
  try {
    const menuItems = await fetchAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
});

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


router.post('/addMenuItem', addMenuItem);

router.post('/editMenuItem', editMenuItem);

module.exports = router;


