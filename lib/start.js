const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("../db/connection");

let depList = ["Sales", "Engineering", "Finance", "Legal"];
let roleList = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Software Engineer",
  "Account Manager",
  "Accountant",
  "Legal Team Lead",
  "Lawyer",
];
let employeeList = [
  "John Doe",
  "Mike Chan",
  "Ashley Rodriguez",
  "Kevin Tupik",
  "Kunal Singh",
  "Malia Brown",
  "Sarah Lourd",
  "Tom Allen",
];

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenuChoice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department?",
        validate: (testsInput) => {
          if (testsInput) {
            return true;
          } else {
            console.log("Please provide the department name!");
            return false;
          }
        },
        when: ({ mainMenuChoice }) => mainMenuChoice === "Add Department",
      },
      {
        type: "input",
        name: "newRoleName",
        message: "What is the name of the role?",
        validate: (testsInput) => {
          if (testsInput) {
            return true;
          } else {
            console.log("Please provide the name of the role!");
            return false;
          }
        },
        when: ({ mainMenuChoice }) => mainMenuChoice === "Add Role",
      },
      {
        type: "input",
        name: "newRoleSalary",
        message: "What is the salary of the new role?",
        validate: (testsInput) => {
          if (testsInput) {
            return true;
          } else {
            console.log("Please provide the salary!");
            return false;
          }
        },
        when: ({ mainMenuChoice }) => mainMenuChoice === "Add Role",
      },
      {
        type: "list",
        name: "newRoleDept",
        message: "Which department does the role belong to?",
        choices: depList,
        when: ({ mainMenuChoice }) => mainMenuChoice === "Add Role",
      },
      {
        type: "input",
        name: "updateId",
        message: "Who is the employee's to update?",
        choices: employeeList,
        when: ({ mainMenuChoice }) => mainMenuChoice === "Update Employee Role",
      },
      {
        type: "input",
        name: "newEmpFirstName",
        message: "What is the employee's first name?",
        validate: (testsInput) => {
          if (testsInput) {
            return true;
          } else {
            console.log("Please provide the employee's first name!");
            return false;
          }
        },
        when: ({ mainMenuChoice }) =>
          mainMenuChoice === "Add Employee" ||
          mainMenuChoice === "Update Employee Role",
      },
      {
        type: "input",
        name: "newEmpLastName",
        message: "What is the employee's last name?",
        validate: (testsInput) => {
          if (testsInput) {
            return true;
          } else {
            console.log("Please provide the employee's last name!");
            return false;
          }
        },
        when: ({ mainMenuChoice }) =>
          mainMenuChoice === "Add Employee" ||
          mainMenuChoice === "Update Employee Role",
      },
      {
        type: "list",
        name: "newEmpRole",
        message: "What is the employee's role?",
        choices: roleList,
        when: ({ mainMenuChoice }) =>
          mainMenuChoice === "Add Employee" ||
          mainMenuChoice === "Update Employee Role",
      },
      {
        type: "input",
        name: "newEmpManager",
        message: "Who is the employee's manager?",
        choices: employeeList,
        when: ({ mainMenuChoice }) =>
          mainMenuChoice === "Add Employee" ||
          mainMenuChoice === "Update Employee Role",
      },
    ])
    .then((choice) => {
      //   console.log(choice);
      //   console.table(choice);

      switch (choice.mainMenuChoice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee(choice);
          break;
        case "Update Employee Role":
          updateEmployee(choice);
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole(choice);
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment(choice);
          break;
        case "Quit":
          quitApp();
          break;
      }
    });
};

const quitApp = () => {
  console.log("Thank you for using the Employee Tracker!");
};

// Departments
const viewAllDepartments = () => {
  const sql = `SELECT *
  FROM departments`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(`Unable to display data. ` + err.message);
      return mainMenu();
    }
    console.table(rows);
    return mainMenu();
  });
};

const addDepartment = (userInput) => {
  const params = userInput.newDepartment;

  const sql = `INSERT INTO departments (name)
    VALUES (?)`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(
        `Error: Unable to add ${params} to the database. ` + err.message
      );
      return mainMenu();
    }
    depList.push(userInput.newDepartment);
    console.log(`Added ${params} to the database`);
    return mainMenu();
  });
};

// Roles
const viewAllRoles = () => {
  const sql = `SELECT * FROM roles`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(`Unable to display data. ` + err.message);
      return mainMenu();
    }
    console.table(rows);
    return mainMenu();
  });
};

const addRole = (userInput) => {
  const params = [
    userInput.newRoleName,
    userInput.newRoleSalary,
    userInput.newRoleDept,
  ];

  const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?)`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(
        `Error: Unable to add ${params[0]} to the database. ` + err.message
      );
      return mainMenu();
    }
    roleList.push(userInput.newRoleName);
    console.log(`Added ${params[0]} to the database`);
    return mainMenu();
  });
};

// Employees
const viewAllEmployees = () => {
  const sql = `SELECT * FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(`Unable to display data. ` + err.message);
      return mainMenu();
    }
    console.table(rows);
    return mainMenu();
  });
};

const addEmployee = (userInput) => {
  const params = [
    userInput.newEmpFirstName,
    userInput.newEmpLastName,
    userInput.newEmpRole,
    userInput.newEmpManager,
  ];

  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(
        `Error: Unable to add ${params[0]} to the database. ` + err.message
      );
      return mainMenu();
    }
    console.log(`Added ${params[0]} ${params[1]} to the database`);
    return mainMenu();
  });
};

const updateEmployee = (userInput) => {
  const params = [
    userInput.newEmpFirstName,
    userInput.newEmpLastName,
    userInput.newEmpRole,
    userInput.newEmpManager,
    userInput.updateId,
  ];

  const sql = `UPDATE employees SET
    first_name = ?,
    last_name = ?,
    role_id = ?,
    manager_id = ?

  WHERE id = ?`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(
        `Error: Unable to update ${params[0]} to the database. ` + err.message
      );
      return mainMenu();
    }
    console.log(`Updated ${params[0]} ${params[1]} in the database`);
    return mainMenu();
  });
};

function initializeApp() {
  mainMenu();
}

module.exports = initializeApp;
