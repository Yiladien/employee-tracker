const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "1F0pWq4MEUL1^#Y",
    database: "employee_data",
  },
  console.log("Connected to the employee_data database.")
);

module.exports = db;
