/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const { addMenuItem, editMenuItem, fetchAllMenuItems } = require('../db/queries/menuItems')
const { getUserById } = require('../db/queries/users');

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

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (req.xhr) {
      res.json(user);
    } else {
      res.render('index', { user });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
});

router.post('/addMenuItem', addMenuItem);

router.post('/editMenuItem', editMenuItem);

module.exports = router;


