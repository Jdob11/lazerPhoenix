const db = require('../connection');

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
  RETURNING *;
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

//remove menu item
const removeMenuItem = (menuItemId) => {
  const queryStr = `
  DELETE FROM menu_items
  WHERE id = $1
  RETURNING *;
  `;

  const queryParams = [menuItemId]

  return db.query(queryStr, queryPrams)
  .then((results) => {
    return results.rows[0];
  })
  .catch((err) => {
    console.log("error: ", err);
    throw err;
  });
};

//fetch menu item by id
const menuItemId = (menuItemId) => {
  const queryStr = `
  SELECT * FROM menu_items
  WHERE id = $1;
  `;

  const queryParams = [menuItemId];

  return db.query(queryStr, queryParams)
  .then((results) => {
    return results.rows[0];
  })
  .catch((err) => {
    console.log("error:", err);
    throw err;
  });
};


module.exports = {
  fetchAllMenuItems,
  addMenuItem,
  removeMenuItem,
  menuItemId
 };
