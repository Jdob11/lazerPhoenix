const db = require('../connection');

//fetch all orders
const fetchAllOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      return data.rows;
    });
};

//fetch menu order by id
const getOrderById = (orderId) => {
  const queryStr = `
  SELECT * FROM orders
  WHERE id = $1;
  `;

  const queryParams = [orderId];

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
  const queryStr = `INSERT INTO orders (id, user_id, time_ordered, total_cost, completed_at)
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

  return db.query(queryStr, queryParams)
  .then((results) => {
    return results.rows[0]
  })
  .catch((err) => {
    console.log("error: ", err)
  });
}

const getOrderInfo = () => {
  const queryStr = `
  SELECT orders.id AS order_id, orders.total_cost, users.name AS customer, users.phone, menu_items.name AS food_name, menu_items.price, order_items.quantity
  FROM orders
  JOIN users ON users.id = user_id
  JOIN order_items ON orders.id = order_id
  JOIN menu_items ON menu_items.id = menu_item_id
  WHERE orders.completed_at IS NULL;
  `;
  return db.query(queryStr)
  .then((results) => {
    return results.rows;
  })
  .catch((err) => {
    console.log("error:", err);
    throw err;
  });
};



module.exports = {
  fetchAllOrders,
  getOrderById,
  orderTotal,
  placeOrder,
  getOrderInfo,
}
