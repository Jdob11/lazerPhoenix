const { Client } = require('pg');
const db = require('../connection');

const client = new Client({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "laserphoenix"
})

// get all menu items
const fetchAllMenuItems = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => {
      return data.rows;
    });
};

// add a new menu item
const addMenuItem = (menu_item) => {
  const queryStr =
  `INSERT INTO menu_items (name, description, price, category, image_url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;

  const queryParams = [menu_item.name, menu_item.description,
                       menu_item.price, menu_item.category,
                       menu_item.image_url];

  return db.query(queryStr, queryParams)
  .then((results) =>{
    return results.rows[0];
  })
  .catch((err) => {
    console.log("error: ", err)
    throw err;
  });
};


module.exports = {
  fetchAllMenuItems,
  addMenuItem,
 };
