const db = require('../connection');

// get all users
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = (userId) => {
  const queryStr = `
  SELECT * FROM users
  WHERE id = $1;
  `;

  const queryParams = [userId];

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
  getUsers,
  getUserById
  };
