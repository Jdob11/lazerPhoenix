const db = require('../connection');

// get all menu items
const fetchAllMenuItems = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => {
      return data.rows;
    });
};

// add a new menu item
const addMenuItem = (req, res) => {
  const { itemImage, itemName, itemPrice, itemDescription } = req.body;

  const queryStr = `
    INSERT INTO menu_items (name, description, price, category, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const queryParams = [itemName, itemDescription, itemPrice, null, itemImage];

  db.query(queryStr, queryParams, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error adding menu item');
    } else {
      console.log('Menu item added successfully:', result.rows[0]);
      res.status(200).send('Menu item added successfully');
    }
  });
}

//remove menu item
const removeMenuItem = (menuItemId) => {
  const queryStr = `
  DELETE FROM menu_items
  WHERE id = $1
  RETURNING *;
  `;

  const queryParams = [menuItemId]

  return db.query(queryStr, queryParams)
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

//update existing menu item
const updateMenuItem = (req, res) => {
  const { itemImage, itemName, itemPrice, itemDescription } = req.body;

  const queryStr = `
  UPDATE menu_items
  SET name = $1, description = $2, price = $3, image_url = $4
  WHERE id = $5
  RETURNING *;
`;

  const queryParams = [itemName, itemDescription, itemPrice, null, itemImage];

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
  menuItemId,
  updateMenuItem
 };
