const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
};
