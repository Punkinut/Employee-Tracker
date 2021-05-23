const connection = require('../config/connection');
const cTable = require('console.table');

// Class that allows you to create a department
class CreateDepartment {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
    }

    addInfo() {
        return new Promise (resolve => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: this.name,
                    utilized_budget:  this.budget,
                },
                (err, res) => {
                if (err) throw err;
                console.log(`${this.name} Department added to the database...`)
                resolve();
            })
        })
    }
};

// Class that allows you to create a role
class CreateRole {
    constructor(title, salary, id) {
        this.title = title;
        this.salary = salary;
        this.id = id;
    }

    addInfo() {
        return new Promise (resolve => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: this.title,
                    salary:  this.salary,
                    department_id: this.id,
                },
                (err, res) => {
                if (err) throw err;
                console.log(`${this.title} Role added to the database...`)
                resolve();
            })
        })
    }
};

// Class that allows you to create an employee
class CreateEmployee {
    constructor(first, last, roleId, managerId) {
        this.first = first;
        this.last = last;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    addInfo() {
        return new Promise (resolve => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: this.first,
                    last_name:  this.last,
                    role_id: this.roleId,
                    manager_id: this.managerId,
                },
                (err, res) => {
                if (err) throw err;
                console.log(`Added ${this.first} to the database...`)
                resolve();
            })
        })
    }
};

// Exports all the classes
module.exports = {
    CreateDepartment,
    CreateRole,
    CreateEmployee,
};