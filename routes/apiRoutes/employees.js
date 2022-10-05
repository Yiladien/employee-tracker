const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// GET parties
router.get("/employees", (req, res) => {
  const sql = `SELECT * FROM employees`;
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

// Create a employee
router.post("/employee", ({ body }, res) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id,
  ];

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

// Update a employee's party
router.put("/employee/:id", (req, res) => {
  const sql = `UPDATE employees SET 
                  first_name = ?,
                  last_name = ?,
                  role_id = ?,
                  manager_id = ?

                WHERE id = ?`;
  const params = [
    req.body.first_name,
    req.body.last_name,
    req.body.role_id,
    req.body.manager_id,
    req.params.id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

module.exports = router;
