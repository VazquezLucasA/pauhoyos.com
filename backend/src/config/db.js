const mysql = require("mysql2/promise");
const { dbConfig } = require("./env");

const pool = mysql.createPool({
  host: dbConfig.host || "localhost",
  port: dbConfig.port || 3306,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: 10,
  timezone: "Z",
});

module.exports = { pool };
