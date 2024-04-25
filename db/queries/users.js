const db = require('../connection');

// get all users
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getUsers
 };
