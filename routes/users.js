/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/connection.js');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

// Route to handle form submission and add menu item to the database
router.post('/addMenuItem', (req, res) => {
  const { itemImage, itemName, itemPrice, itemDescription } = req.body;

  const queryText = `
    INSERT INTO menu_items (name, description, price, category, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [itemName, itemDescription, itemPrice, null, itemImage]; // Assuming no category

  db.query(queryText, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error adding menu item');
    } else {
      console.log('Menu item added successfully:', result.rows[0]);
      res.status(200).send('Menu item added successfully');
    }
  });
});

module.exports = router;
