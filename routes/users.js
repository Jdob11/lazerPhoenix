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
    const menuItems = await fetchAllMenuItems(); // Fetch menu items from the database
    res.json(menuItems); // Respond with JSON data containing menu items
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
});

// Route to handle form submission and add menu item to the database
router.post('/addMenuItem', addMenuItem);

router.post('/editMenuItem', editMenuItem);

module.exports = router;


