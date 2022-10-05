const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// GET all departments
router.get("/departments", (req, res) => {
  const sql = `SELECT *
      FROM departments`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Create a department
router.post("/department", ({ body }, res) => {
  const sql = `INSERT INTO departments (name)
    VALUES (?)`;
  const params = body.name;

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// Future promise solution - not complete
// router.get("/departments", (req, res) => {
//   const sql = `SELECT *
//       FROM department`;

//   db.promise()
//     .query(sql)
//     .then(([rows, fields]) => {
//       res.json({
//         message: "success",
//         data: rows,
//       });
//     })
//     .catch(() => {
//       res.status(500).json({ error: err.message });
//       return;
//     })
//     .then(() => db.end());
// });

module.exports = router;
