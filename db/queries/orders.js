const db = require('../connection');

//fetch all orders
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
    })
    .catch((err) => {
      console.log("error:", err);
      throw err;
    });
};

//place a new order
const placeOrder  = (order) => {
  const queryStr = `INSER INTO orders (id, user_id, time_ordered, total_cost, completed_at)
                    VALUES ($1, 2$, 3$, $4, $5)
                    RETUNING;
                    `;

  const queryParams = [
    order.id,
    order.user_id,
    order.time_ordered,
    order.total_cost,
    order.completed_at
  ];

  return pool.query(queryStr, queryParams)
  .then((results) => {
    return results.rows[0]
  })
  .catch((err) => {
    console.log("error: ", err)
  });
}


module.exports = {
  fetchAllOrders,
  orderId,
  orderTotal,
  placeOrder
}
