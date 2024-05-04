/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const { addNewMenuItem, editMenuItem, getAllMenuItems } = require('../db/queries/menuItems');
const { getUserById } = require('../db/queries/users');
const { getOrderInfo } = require('../db/queries/orders');

const { sendOrderReceivedSMS } = require('../public/scripts/twilio.js');


router.get('/', (req, res) => {
  res.render('users');
});


router.get('/menuItems', async (req, res) => {
  try {
    const menuItems = await getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
});

router.get('/orderItems', async (req, res) => {
  try {
    const orderItems = await getOrderInfo();
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order items' });
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

router.post('/order', async (req, res) => {
  console.log(req.body);
  const cart = req.body.cart;
  const userId = 2;
  const totalCost = cart.reduce((total, item) => {
    const itemCost = parseInt(item.menuItemPrice) * parseInt(item.quantity);
    return total + itemCost;
}, 0);
  db.query('INSERT INTO orders (user_id, total_cost) VALUES ($1, $2) RETURNING id;', [userId, totalCost])
  .then((res) => res.rows[0].id)
  .then((orderId) => {
    const promises = [];
    for (const cartItem of cart) {
      const promise = db.query('INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3);', [orderId, cartItem.menuItemId, cartItem.quantity]);
      promises.push(promise);
    }

    return Promise.all(promises);
  })
  .then(() => {
    res.status(200).json({message: "order placed succesfully"})
    const phoneNumber = '+17807295721'; // using my person number for now
    sendOrderReceivedSMS(phoneNumber);
    console.log("Order confirmation to:", phoneNumber); //test
  })
  .catch((error) => {
    console.log('error placing order:', error)
  })
});

router.post('/addNewMenuItem', addNewMenuItem);

router.post('/editMenuItem', editMenuItem);

module.exports = router;


