const db = require('../connection');

const fetchAllOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      return data.rows;
    });
};

//fetch menu order by id
const orderId = () => {
  const queryStr = `
  SELECT * FROM orders
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

//calculate the total cost of a order
const orderTotal = () => {
  return db.query(`SELECT sum(total_cost) AS total_cost FROM orders`)
    .then(data => {
      return data.rows[0].total_cost;
    });
};


module.exports = {
  fetchAllOrders,
  orderId,
  orderTotal
}

