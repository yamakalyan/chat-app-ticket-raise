const mysql = require("mysql");
require("dotenv").config();

const creatingConnections = mysql.createConnection({
  host: process.env.HOST_PORT,
  database: process.env.DB_NAME,
  user: process.env.USER_NAME_DB,
  password: process.env.DB_PASSWORD,
});

creatingConnections.connect((err, success) => {
  if (err) {
    console.log("Database Failed");
  } else {
    console.log("Database succesfully connected");
  }
});

module.exports = creatingConnections;