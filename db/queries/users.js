const { Client } = require('pg');
const db = require('../connection');

const client = new Client({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "laserphoenix"
})

// get all users
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};













module.exports = {
  getUsers,
 };
