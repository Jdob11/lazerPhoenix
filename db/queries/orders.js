const db = require('../connection');

const fetchAllOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      return data.rows;
    });
};



module.exports = {
  fetchAllOrders
}

