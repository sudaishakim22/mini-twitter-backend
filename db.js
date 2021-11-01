const Pool = require("pg").Pool;
const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = require("./constants/index");

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: "localhost",
  port: DB_PORT,
  database: DB_NAME,
});

module.exports = pool;
