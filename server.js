const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const initializeApp = require("./lib/start");

const mysql = require("mysql2");

// DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  return initializeApp();
});
