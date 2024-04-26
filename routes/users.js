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

router.get('/', (req, res) => {
  res.render('users');
});

// Route to handle form submission and add menu item to the database
router.post('/addMenuItem', addMenuItem);

module.exports = router;


