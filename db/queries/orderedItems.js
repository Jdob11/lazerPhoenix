const db = require('../connection');

// fetch all ordered items
const allOrderedItems = () => {
  return db.query('SELECT * FROM ordered_items;')
    .then(data => {
      return data.rows;
    });
};


module.exports = {
  allOrderedItems,
}
